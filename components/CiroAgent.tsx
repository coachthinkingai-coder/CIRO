import React, { useEffect } from 'react';

const CiroAgent: React.FC = () => {
  useEffect(() => {
    // --- Picture-in-Picture Handler ---
    const sanitizeVariables = (_url: string, _width: string, _height: string) => {
      try {
        const sanitizedUrl = new URL(_url);
        const url = sanitizedUrl.toString();
        const width = parseInt(_width);
        const height = parseInt(_height);
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
        // @ts-ignore
        if (window.documentPictureInPicture.window) {
          return;
        }
        // @ts-ignore
        const pipWindow = await window.documentPictureInPicture.requestWindow({
          width,
          height,
          disallowReturnToOpener: true
        });
        [...document.styleSheets].forEach(styleSheet => {
          try {
            const cssRules = [...styleSheet.cssRules]
              .map(rule => rule.cssText)
              .join('');
            const style = document.createElement('style');
            style.textContent = cssRules;
            pipWindow.document.head.appendChild(style);
          } catch (e) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = styleSheet.type;
            // FIX: Type 'MediaList' is not assignable to type 'string'. Use `mediaText` property instead.
            link.media = styleSheet.media.mediaText;
            // @ts-ignore
            link.href = styleSheet.href;
            pipWindow.document.head.appendChild(link);
          }
        });
        pipWindow.document.body.innerHTML = `<iframe src="${url}" style="width: ${width}px; height: ${height}px;" allow="microphone *; display-capture *;"></iframe>`;
        return { success: true, isActive: false };
      }
    };

    window.addEventListener('message', handlePictureInPictureRequest);

    // --- Agent Initializer ---
    const jfAgentCacheName = 'dynamic-agent-v1';
    
    const scriptSrc = "https://www.noupe.com/s/umd/dc38095c1ba/for-embedded-agent.js";
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      script.onload = () => {
        // @ts-ignore
        if (window.AgentInitializer) {
            // @ts-ignore
            window.AgentInitializer.init({
                agentRenderURL: "https://www.noupe.com/agent/0199d2603d3f70dd8124103336e76b190358",
                rootId: "JotformAgent-0199d2603d3f70dd8124103336e76b190358",
                formID: "0199d2603d3f70dd8124103336e76b190358",
                contextID: "0199dd3747fa729398478a3fdcd0e95f1431",
                initialContext: "",
                queryParams: ["skipWelcome=1","maximizable=1","skipWelcome=1","maximizable=1","isNoupeAgent=1","isNoupeLogo=0","noupeSelectedColor=%23a3f787","B_VARIANT_AUTO_OPEN_NOUPE_CHATBOT_ON_PREVIEW=34462"],
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
            });
        }
      };
      document.head.appendChild(script);
    }
    
    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('message', handlePictureInPictureRequest);
    };

  }, []); // Empty dependency array means this effect runs once on mount

  return <div id="JotformAgent-0199d2603d3f70dd8124103336e76b190358" />;
};

export default CiroAgent;