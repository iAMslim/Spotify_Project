import React from 'react';

function Login() {
    return (
        <div className="App">
            <header className="App-header">
                <button className="btn-spotify" onClick={() => window.location.href = '/auth/login'}>
                    Login with Spotify
                </button>
            </header>
        </div>
    );
}

export default Login;
