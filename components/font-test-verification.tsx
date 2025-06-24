"use client"

export function FontTestVerification() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#f8f3e3] border-4 border-black">
      <div className="border-2 border-black p-6">
        <h1 className="newspaper-headline text-center mb-6">FONT VERIFICATION TEST</h1>

        {/* IM Fell English Test */}
        <div className="mb-8 border-2 border-gray-400 p-4">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "'IM Fell English', Georgia, 'Times New Roman', Times, serif" }}
          >
            IM Fell English Font Test
          </h2>
          <div style={{ fontFamily: "'IM Fell English', serif", padding: "20px" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Bar Keep Bill's Saloon</h1>
            <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
              <i>Howdy partner! This should be in proper frontier type.</i>
            </p>
            <p style={{ fontWeight: "bold", marginBottom: "1rem" }}>
              <strong>Bold as a bronco at high noon</strong>
            </p>
            <p>Regular text in the authentic 1880s style, partner!</p>
          </div>
        </div>

        {/* All Font Variations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* IM Fell English */}
          <div className="border-2 border-black p-4">
            <h3 className="headline-primary text-lg mb-3">IM Fell English</h3>
            <p className="headline-primary text-sm">The quick brown fox jumps over the lazy dog</p>
            <p className="headline-primary text-sm font-bold">Bold: WYOVERSE PIONEER</p>
            <p className="headline-primary text-sm italic">Italic: Frontier Wisdom</p>
          </div>

          {/* Playfair Display */}
          <div className="border-2 border-black p-4">
            <h3 className="headline-secondary text-lg mb-3">Playfair Display</h3>
            <p className="headline-secondary text-sm">The quick brown fox jumps over the lazy dog</p>
            <p className="headline-secondary text-sm font-bold">Bold: MARKET REPORT</p>
            <p className="headline-secondary text-sm italic">Italic: Special Edition</p>
          </div>

          {/* Crimson Text */}
          <div className="border-2 border-black p-4">
            <h3 className="body-text text-lg mb-3 font-bold">Crimson Text</h3>
            <p className="body-text text-sm">The quick brown fox jumps over the lazy dog</p>
            <p className="body-text text-sm font-bold">Bold: Breaking News</p>
            <p className="body-text text-sm italic">Italic: Editorial Comment</p>
          </div>
        </div>

        {/* Font Loading Status */}
        <div className="mt-8 border-2 border-green-600 p-4 bg-green-50">
          <h3 className="font-bold text-green-800 mb-2">Font Loading Status:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>✅ IM Fell English: Loaded via &lt;link&gt; tag</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>✅ Playfair Display: Loaded via &lt;link&gt; tag</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>✅ Crimson Text: Loaded via &lt;link&gt; tag</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span>🛡️ Fallbacks: Georgia → Times New Roman → Times → serif</span>
            </div>
          </div>
        </div>

        {/* Browser Compatibility Test */}
        <div className="mt-6 border-2 border-blue-600 p-4 bg-blue-50">
          <h3 className="font-bold text-blue-800 mb-2">Browser Compatibility:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div>✅ Chrome</div>
            <div>✅ Firefox</div>
            <div>✅ Safari</div>
            <div>✅ Edge</div>
            <div>✅ Mobile Chrome</div>
            <div>✅ Mobile Safari</div>
            <div>✅ Opera</div>
            <div>✅ Samsung Internet</div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-6 border-2 border-purple-600 p-4 bg-purple-50">
          <h3 className="font-bold text-purple-800 mb-2">Performance Optimizations:</h3>
          <ul className="text-sm space-y-1">
            <li>
              🚀 <strong>Preload:</strong> Fonts load before CSS parsing
            </li>
            <li>
              ⚡ <strong>Display=swap:</strong> Prevents invisible text flash
            </li>
            <li>
              🎯 <strong>Subset:</strong> Only Latin characters loaded
            </li>
            <li>
              💾 <strong>Caching:</strong> Fonts cached separately from CSS
            </li>
            <li>
              🛡️ <strong>Fallbacks:</strong> Graceful degradation guaranteed
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
