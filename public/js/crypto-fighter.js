// Phaser.js Crypto Fighter with Arms and Boxing Gloves
const Phaser = require("phaser") // Declare the Phaser variable

class CryptoFighter extends Phaser.GameObjects.Container {
  constructor(scene, x, y, type, isPlayer) {
    super(scene, x, y)
    this.scene = scene
    this.type = type
    this.isPlayer = isPlayer
    this.health = 100
    this.energy = 100

    // Fighter configuration
    this.config = this.getFighterConfig(type)

    // Create fighter components
    this.createBody()
    this.createArms()
    this.createGloves()
    this.createHealthBar()
    this.setupAnimations()

    // Add to scene
    scene.add.existing(this)
    scene.physics.add.existing(this)

    // Physics setup
    this.body.setSize(80, 180)
    this.body.setOffset(-40, -90)
    this.body.setCollideWorldBounds(true)
  }

  getFighterConfig(type) {
    const configs = {
      bull: {
        bodyColor: 0xf7931a, // Bitcoin orange
        symbol: "₿",
        name: "Bitcoin Bull",
        gloveColor: 0xff0000, // Red gloves
        strength: 85,
        speed: 70,
        defense: 90,
      },
      bear: {
        bodyColor: 0x4b4b4b, // Market bear gray
        symbol: "🐻",
        name: "Market Bear",
        gloveColor: 0x0000ff, // Blue gloves
        strength: 90,
        speed: 65,
        defense: 85,
      },
      dog: {
        bodyColor: 0xcb9800, // Dogecoin yellow
        symbol: "Ð",
        name: "Doge Fighter",
        gloveColor: 0xffd700, // Gold gloves
        strength: 75,
        speed: 95,
        defense: 70,
      },
      tiger: {
        bodyColor: 0xff6b00, // TRON orange
        symbol: "Ξ",
        name: "Ethereum Tiger",
        gloveColor: 0x8a2be2, // Purple gloves
        strength: 80,
        speed: 85,
        defense: 75,
      },
      panda: {
        bodyColor: 0xffffff, // Cardano white
        symbol: "₳",
        name: "Cardano Panda",
        gloveColor: 0x00ff00, // Green gloves
        strength: 70,
        speed: 80,
        defense: 95,
      },
    }
    return configs[type] || configs["bull"]
  }

  createBody() {
    // Main body
    this.bodySprite = this.scene.add.ellipse(0, 0, 80, 120, this.config.bodyColor)
    this.bodySprite.setStrokeStyle(3, 0x000000)
    this.add(this.bodySprite)

    // Head
    this.head = this.scene.add.circle(0, -80, 35, this.config.bodyColor)
    this.head.setStrokeStyle(2, 0x000000)
    this.add(this.head)

    // Crypto symbol on body
    this.symbol = this.scene.add
      .text(0, -10, this.config.symbol, {
        fontSize: "28px",
        fontFamily: "Arial Black",
        color: "#000000",
        stroke: "#FFFFFF",
        strokeThickness: 3,
      })
      .setOrigin(0.5)
    this.add(this.symbol)

    // Eyes
    this.leftEye = this.scene.add.circle(-12, -85, 5, 0x000000)
    this.rightEye = this.scene.add.circle(12, -85, 5, 0x000000)
    this.add([this.leftEye, this.rightEye])

    // Legs
    this.leftLeg = this.scene.add.rectangle(-20, 80, 25, 60, this.config.bodyColor)
    this.rightLeg = this.scene.add.rectangle(20, 80, 25, 60, this.config.bodyColor)
    this.leftLeg.setStrokeStyle(2, 0x000000)
    this.rightLeg.setStrokeStyle(2, 0x000000)
    this.add([this.leftLeg, this.rightLeg])
  }

  createArms() {
    // Arm positions based on player side
    const armOffset = this.isPlayer ? 1 : -1

    // Upper arms
    this.leftUpperArm = this.scene.add.rectangle(-45 * armOffset, -20, 50, 20, 0x8b4513)
    this.rightUpperArm = this.scene.add.rectangle(45 * armOffset, -20, 50, 20, 0x8b4513)
    this.leftUpperArm.setStrokeStyle(2, 0x000000)
    this.rightUpperArm.setStrokeStyle(2, 0x000000)

    // Lower arms (forearms)
    this.leftForearm = this.scene.add.rectangle(-70 * armOffset, 10, 40, 18, 0xa0522d)
    this.rightForearm = this.scene.add.rectangle(70 * armOffset, 10, 40, 18, 0xa0522d)
    this.leftForearm.setStrokeStyle(2, 0x000000)
    this.rightForearm.setStrokeStyle(2, 0x000000)

    this.add([this.leftUpperArm, this.rightUpperArm, this.leftForearm, this.rightForearm])

    // Store original positions for animations
    this.originalArmPositions = {
      leftUpper: { x: this.leftUpperArm.x, y: this.leftUpperArm.y },
      rightUpper: { x: this.rightUpperArm.x, y: this.rightUpperArm.y },
      leftFore: { x: this.leftForearm.x, y: this.leftForearm.y },
      rightFore: { x: this.rightForearm.x, y: this.rightForearm.y },
    }
  }

  createGloves() {
    const gloveOffset = this.isPlayer ? 1 : -1

    // Boxing gloves
    this.leftGlove = this.scene.add.circle(-85 * gloveOffset, 10, 22, this.config.gloveColor)
    this.rightGlove = this.scene.add.circle(85 * gloveOffset, 10, 22, this.config.gloveColor)

    // Glove details (laces)
    this.leftGloveLace = this.scene.add.ellipse(-85 * gloveOffset, 5, 12, 8, 0xffffff)
    this.rightGloveLace = this.scene.add.ellipse(85 * gloveOffset, 5, 12, 8, 0xffffff)

    // Glove strokes
    this.leftGlove.setStrokeStyle(3, 0x000000)
    this.rightGlove.setStrokeStyle(3, 0x000000)
    this.leftGloveLace.setStrokeStyle(1, 0x000000)
    this.rightGloveLace.setStrokeStyle(1, 0x000000)

    this.add([this.leftGlove, this.rightGlove, this.leftGloveLace, this.rightGloveLace])

    // Store original glove positions
    this.originalGlovePositions = {
      left: { x: this.leftGlove.x, y: this.leftGlove.y },
      right: { x: this.rightGlove.x, y: this.rightGlove.y },
      leftLace: { x: this.leftGloveLace.x, y: this.leftGloveLace.y },
      rightLace: { x: this.rightGloveLace.x, y: this.rightGloveLace.y },
    }
  }

  createHealthBar() {
    // Health bar background
    this.healthBarBg = this.scene.add.rectangle(0, -120, 80, 8, 0x000000)
    this.healthBarBg.setStrokeStyle(1, 0xffffff)

    // Health bar fill
    this.healthBarFill = this.scene.add.rectangle(-38, -120, 76, 6, 0x00ff00)
    this.healthBarFill.setOrigin(0, 0.5)

    // Name label
    this.nameLabel = this.scene.add
      .text(0, -140, this.config.name, {
        fontSize: "12px",
        fontFamily: "Arial",
        color: "#FFFFFF",
        stroke: "#000000",
        strokeThickness: 2,
      })
      .setOrigin(0.5)

    this.add([this.healthBarBg, this.healthBarFill, this.nameLabel])
  }

  setupAnimations() {
    // Idle animation
    this.idleAnimation = this.scene.tweens.add({
      targets: this,
      y: this.y + 5,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    })
  }

  punch(isLeft, callback) {
    const glove = isLeft ? this.leftGlove : this.rightGlove
    const gloveLace = isLeft ? this.leftGloveLace : this.rightGloveLace
    const upperArm = isLeft ? this.leftUpperArm : this.rightUpperArm
    const forearm = isLeft ? this.leftForearm : this.rightForearm

    const direction = this.isPlayer ? 1 : -1
    const punchDistance = 40

    // Punch animation
    const punchTween = this.scene.tweens.add({
      targets: [glove, gloveLace, upperArm, forearm],
      x: `+=${punchDistance * direction}`,
      duration: 150,
      ease: "Power2",
      yoyo: true,
      onComplete: () => {
        if (callback) callback()
      },
    })

    // Add punch effect
    this.createPunchEffect(glove.x + punchDistance * direction, glove.y)

    // Play punch sound
    if (this.scene.sound && this.scene.sound.sounds.find((s) => s.key === "punch")) {
      this.scene.sound.play("punch", { volume: 0.3 })
    }

    return punchTween
  }

  createPunchEffect(x, y) {
    // Create impact effect
    const effect = this.scene.add.circle(x, y, 5, 0xffff00)
    effect.setAlpha(0.8)

    this.scene.tweens.add({
      targets: effect,
      scaleX: 3,
      scaleY: 3,
      alpha: 0,
      duration: 200,
      ease: "Power2",
      onComplete: () => {
        effect.destroy()
      },
    })

    // Add particles
    if (this.scene.add.particles) {
      const particles = this.scene.add.particles(x, y, "spark", {
        speed: { min: 50, max: 100 },
        scale: { start: 0.3, end: 0 },
        lifespan: 300,
        quantity: 5,
      })

      this.scene.time.delayedCall(300, () => {
        particles.destroy()
      })
    }
  }

  takeDamage(amount) {
    this.health = Math.max(0, this.health - amount)

    // Update health bar
    const healthPercent = this.health / 100
    this.healthBarFill.scaleX = healthPercent

    // Change health bar color based on health
    if (healthPercent > 0.6) {
      this.healthBarFill.setFillStyle(0x00ff00) // Green
    } else if (healthPercent > 0.3) {
      this.healthBarFill.setFillStyle(0xffff00) // Yellow
    } else {
      this.healthBarFill.setFillStyle(0xff0000) // Red
    }

    // Damage flash effect
    this.scene.tweens.add({
      targets: [this.bodySprite, this.head],
      alpha: 0.5,
      duration: 100,
      yoyo: true,
      repeat: 2,
    })

    // Check if knocked out
    if (this.health <= 0) {
      this.knockout()
    }
  }

  knockout() {
    // Stop idle animation
    if (this.idleAnimation) {
      this.idleAnimation.stop()
    }

    // Knockout animation
    this.scene.tweens.add({
      targets: this,
      angle: this.isPlayer ? -90 : 90,
      y: this.y + 50,
      duration: 1000,
      ease: "Bounce.easeOut",
    })

    // Add knockout effect
    const koText = this.scene.add
      .text(this.x, this.y - 100, "K.O.!", {
        fontSize: "32px",
        fontFamily: "Arial Black",
        color: "#FF0000",
        stroke: "#FFFFFF",
        strokeThickness: 4,
      })
      .setOrigin(0.5)

    this.scene.tweens.add({
      targets: koText,
      scaleX: 1.5,
      scaleY: 1.5,
      alpha: 0,
      duration: 2000,
      ease: "Power2",
      onComplete: () => {
        koText.destroy()
      },
    })
  }

  block() {
    // Defensive position
    this.scene.tweens.add({
      targets: [this.leftGlove, this.rightGlove, this.leftGloveLace, this.rightGloveLace],
      y: this.head.y,
      duration: 200,
      yoyo: true,
      ease: "Power2",
    })
  }

  celebrate() {
    // Victory animation
    this.scene.tweens.add({
      targets: [this.leftGlove, this.rightGlove],
      y: this.y - 150,
      duration: 500,
      yoyo: true,
      repeat: 3,
      ease: "Power2",
    })

    // Add victory text
    const victoryText = this.scene.add
      .text(this.x, this.y - 150, "WINNER!", {
        fontSize: "24px",
        fontFamily: "Arial Black",
        color: "#FFD700",
        stroke: "#000000",
        strokeThickness: 3,
      })
      .setOrigin(0.5)

    this.scene.tweens.add({
      targets: victoryText,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    })
  }

  destroy() {
    // Clean up animations
    if (this.idleAnimation) {
      this.idleAnimation.stop()
    }

    super.destroy()
  }
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = CryptoFighter
}
