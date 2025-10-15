import React, { useState } from 'react';

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [ricerca, setRicerca] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setEmailError('Inserisci un indirizzo email valido');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async () => {
    setSubmitMessage('');

    if (!email || !ricerca) {
      setSubmitMessage('Tutti i campi sono obbligatori');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Inserisci un indirizzo email valido');
      return;
    }

    setIsSubmitting(true);

    try {
      // SOSTITUISCI QUESTO URL CON IL TUO ENDPOINT API
      const API_URL = 'https://your-api-endpoint.com/submit';
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: email,
          user_request: ricerca,
        }),
      });

      if (response.ok) {
        setSubmitMessage('Richiesta inviata con successo!');
        setEmail('');
        setRicerca('');
      } else {
        setSubmitMessage('Errore durante l\'invio. Riprova.');
      }
    } catch (error) {
      console.error('Errore:', error);
      setSubmitMessage('Errore di connessione. Verifica la tua connessione internet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">ChatWithDocument</h1>
          <p className="text-gray-600 text-lg">Cerca informazioni nei tuoi documenti</p>
        </div>

        <div className="bg-white border-2 border-blue-500 rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  emailError
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                    : 'border-blue-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
                placeholder="tuo@email.com"
              />
              {emailError && (
                <p className="mt-2 text-sm text-red-600">{emailError}</p>
              )}
            </div>

            <div>
              <label htmlFor="ricerca" className="block text-sm font-semibold text-gray-700 mb-2">
                Ricerca *
              </label>
              <textarea
                id="ricerca"
                value={ricerca}
                onChange={(e) => setRicerca(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors resize-none"
                placeholder="Inserisci la tua richiesta..."
                rows={4}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !!emailError || !email || !ricerca}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Invio in corso...
                </span>
              ) : (
                'Submit'
              )}
            </button>

            {submitMessage && (
              <div
                className={`mt-4 p-4 rounded-lg ${
                  submitMessage.includes('successo')
                    ? 'bg-green-50 border-2 border-green-500 text-green-800'
                    : 'bg-red-50 border-2 border-red-500 text-red-800'
                }`}
              >
                {submitMessage}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>I campi contrassegnati con * sono obbligatori</p>
        </div>
      </div>
    </div>
  );
};

export default App;
