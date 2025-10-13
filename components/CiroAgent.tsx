import React, { useEffect, useRef } from 'react';

const CiroAgent: React.FC = () => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const scriptSrc = "https://www.noupe.com/s/umd/dc38095c1ba/for-embedded-agent.js";
    const rootId = "JotformAgent-0199d2603d3f70dd8124103336e76b190358";
    
    // --- Global Error Handler for cross-origin scripts ---
    const handleGlobalError = (event: ErrorEvent) => {
        // "Script error." is vague. Check if it's from our target script.
        if (event.filename && event.filename.includes(scriptSrc.split('/').pop() || '')) {
            console.error('CiroAgent: An error occurred inside the external agent script.', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error
            });
        }
    };
    window.addEventListener('error', handleGlobalError);

    // --- Picture-in-Picture Handler ---
    const sanitizeVariables = (_url: string, _width: string, _height: string) => {
      try {
        const sanitizedUrl = new URL(_url);
        const url = sanitizedUrl.toString();
        const width = parseInt(_width, 10);
        const height = parseInt(_height, 10);
        if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
          throw new Error('Invalid width or height');
        }
        return { url, width, height };
      } catch (e) {
        console.error('Error sanitizing variables', e);
        return { url: '', width: 0, height: 0 };
      }
    };

    const handlePictureInPictureRequest = async (event: MessageEvent) => {
      if (event.data.type !== 'jf-request-pip-window') {
        return;
      }
      const { _url, _width, _height } = event.data;
      const { url, width, height } = sanitizeVariables(_url, _width, _height);
      if (url === '' || width === 0 || height === 0) {
        return;
      }
      if ('documentPictureInPicture' in window) {
        // @ts-ignore: documentPictureInPicture is an experimental API
        if (window.documentPictureInPicture.window) {
          return;
        }
        try {
          // @ts-ignore: documentPictureInPicture is an experimental API
          const pipWindow = await window.documentPictureInPicture.requestWindow({
            width,
            height,
            disallowReturnToOpener: true
          });
          
          [...document.styleSheets].forEach(styleSheet => {
            try {
              if (styleSheet.href) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = styleSheet.type;
                link.media = styleSheet.media.mediaText;
                link.href = styleSheet.href;
                pipWindow.document.head.appendChild(link);
              } else {
                 const cssRules = [...styleSheet.cssRules]
                  .map(rule => rule.cssText)
                  .join('');
                const style = document.createElement('style');
                style.textContent = cssRules;
                pipWindow.document.head.appendChild(style);
              }
            } catch (e) {
              console.warn('Could not copy stylesheet to PiP window:', e);
            }
          });

          const iframe = pipWindow.document.createElement('iframe');
          iframe.src = url;
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.border = 'none';
          iframe.allow = "microphone *; display-capture *;";
          pipWindow.document.body.appendChild(iframe);
          pipWindow.document.body.style.margin = '0';

        } catch(err) {
            console.error('Failed to open Picture-in-Picture window', err);
        }
      }
    };

    window.addEventListener('message', handlePictureInPictureRequest);

    // --- Agent Initializer ---
    let isMounted = true;
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      scriptRef.current = script;

      console.log(`CiroAgent: Attempting to load script from ${scriptSrc}`);

      script.onload = () => {
        if (!isMounted) return;
        console.log(`CiroAgent: Successfully loaded script from ${scriptSrc}`);
        // @ts-ignore: AgentInitializer is loaded from the external script
        if (window.AgentInitializer) {
            const rootElement = document.getElementById(rootId);
            if (rootElement) {
                try {
                  console.log(`CiroAgent: Root element #${rootId} found. Initializing agent.`);
                  const agentConfig = {
                      agentRenderURL: "https://www.noupe.com/agent/0199d2603d3f70dd8124103336e76b190358",
                      rootId: rootId,
                      formID: "0199d2603d3f70dd8124103336e76b190358",
                      contextID: "0199dd3747fa729398478a3fdcd0e95f1431",
                      initialContext: "",
                      queryParams: [
                        "skipWelcome=1",
                        "maximizable=1",
                        "isNoupeAgent=1",
                        "isNoupeLogo=0",
                        "noupeSelectedColor=%23a3f787",
                        "B_VARIANT_AUTO_OPEN_NOUPE_CHATBOT_ON_PREVIEW=34462"
                      ],
                      domain: "https://www.noupe.com",
                      isDraggable: false,
                      background: "linear-gradient(180deg, #6C73A8 0%, #6C73A8 100%)",
                      buttonBackgroundColor: "#0066C3",
                      buttonIconColor: "#FFFFFF",
                      inputTextColor: "#01105C",
                      variant: false,
                      customizations: null,
                      isVoice: false,
                      isVoiceWebCallEnabled: false
                  };
                  // @ts-ignore: AgentInitializer is loaded from the external script
                  window.AgentInitializer.init(agentConfig);
                } catch (e) {
                    console.error('CiroAgent: Error during AgentInitializer.init() call.', e);
                }
            } else {
                console.error(`CiroAgent: Root element #${rootId} not found in the DOM.`);
            }
        } else {
            console.error(`CiroAgent: 'AgentInitializer' not found on the window object after script loaded.`);
        }
      };
      
      script.onerror = () => {
        if (!isMounted) return;
        console.error(`CiroAgent: Failed to load script from ${scriptSrc}`);
      };

      document.body.appendChild(script);
    }
    
    // Cleanup function
    return () => {
      isMounted = false;
      window.removeEventListener('message', handlePictureInPictureRequest);
      window.removeEventListener('error', handleGlobalError);

      const rootElement = document.getElementById(rootId);
      if (rootElement) {
          // @ts-ignore
          if (window.AgentInitializer && typeof window.AgentInitializer.destroy === 'function') {
            try {
              // @ts-ignore
              window.AgentInitializer.destroy(rootId);
            } catch (e) {
              console.error('CiroAgent: Error during AgentInitializer.destroy() call.', e);
            }
          }
          rootElement.innerHTML = '';
      }

      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };

  }, []);

  return <div id="JotformAgent-0199d2603d3f70dd8124103336e76b190358" />;
};

export default CiroAgent;
