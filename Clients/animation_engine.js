// clients/animation_engine.js
class WyomingBoxingEngine {
    constructor() {
        this.sprites = this._loadEncryptedSprites();
        this.compliance = new WyomingCompliance();
    }
    
    _loadEncryptedSprites() {
        // Decrypt with Undead$stackerS
        const encrypted = fs.readFileSync('assets/boxers.enc');
        return decryptSprites(encrypted, process.env.UNDEAD_KEY);
    }
    
    executeMove(boxer, moveType) {
        // Validate against Wyoming laws
        if (!this.compliance.isMoveLegal(moveType)) {
            return this._executeFallback(boxer);
        }
        
        // Get animation frames
        const frames = this.sprites[boxer.token][moveType];
        
        // Wyoming-optimized rendering
        frames.forEach((frame, index) => {
            requestAnimationFrame(() => {
                displayFrame(frame);
                if (index === frames.length - 1) {
                    this._checkForContact(boxer, moveType);
                }
            });
        });
    }
    
    _checkForContact(attacker, moveType) {
        // Quantum-secure collision detection
        const hitbox = getHitbox(moveType);
        const target = findOpponent(hitbox);
        
        if (target) {
            const damage = calculateMarketDamage(attacker, target);
            applyHit(target, damage);
            broadcastToWyomingChain(attacker, target, damage);
        }
    }
}
