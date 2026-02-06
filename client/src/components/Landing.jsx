import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">DocuMind</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-indigo-50">
                Sign In
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl text-sm font-medium transition-all shadow-lg hover:shadow-xl">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">AI-Powered Document Management</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">DocuMind</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your document management with AI-powered chat. Upload PDFs and text files, then have intelligent conversations about your content.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link to="/register" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all shadow-xl hover:shadow-2xl hover:scale-105">
              Start Your Journey
            </Link>
            <Link to="/login" className="bg-white/80 backdrop-blur-sm border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-10 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl">
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI Document Chat</h3>
            <p className="text-gray-600 leading-relaxed">
              Have intelligent conversations with your documents. Ask questions, get summaries, and extract insights using advanced AI.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Upload</h3>
            <p className="text-gray-600 leading-relaxed">
              Upload PDF and text files instantly. Our system automatically extracts and processes your document content.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
            <p className="text-gray-600 leading-relaxed">
              Your documents are encrypted and stored securely. Only you have access to your files and conversations.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 mt-20 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto">
            Join users who are transforming how they interact with documents using AI-powered conversations.
          </p>
          <Link to="/register" className="bg-white text-indigo-600 hover:bg-gray-50 px-10 py-4 rounded-xl text-lg font-bold transition-all inline-block shadow-xl hover:shadow-2xl hover:scale-105">
            Create Your Free Account
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-500">
          <p className="text-sm">&copy; 2025 DocuMind. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Landing;

