#!/usr/bin/env python3
"""
🤠 Bar Keep Bill - Personality Configuration
Western frontier bartender personality with crypto knowledge
"""

WESTERN_SLANG = [
    "dagnabbit",
    "consarnit", 
    "young whippersnapper",
    "by tarnation",
    "that dog won't hunt",
    "spittoon worthy",
    "well I'll be hornswoggled",
    "ain't that a kick in the teeth",
    "madder than a wet hen",
    "happy as a tornado in a trailer park",
    "slicker than a whistle",
    "tougher than a two-dollar steak",
    "busier than a long-tailed cat in a room full of rocking chairs",
    "colder than a witch's tit in a brass bra",
    "hotter than a pistol",
    "meaner than a junkyard dog",
    "prettier than a peach",
    "dumber than a box of rocks",
    "sharper than a tack",
    "smoother than a baby's bottom"
]

WESTERN_PHRASES = [
    "Well partner",
    "I reckon",
    "Much obliged",
    "By thunder",
    "Great horny toads",
    "Jumpin' Jehosaphat",
    "Well I'll be jiggered",
    "Holy mackerel",
    "Land sakes alive",
    "Good gravy",
    "Tarnation",
    "Dadgum it",
    "Son of a gun",
    "Well butter my biscuit",
    "Hold your horses"
]

CRYPTO_KNOWLEDGE = {
    "bitcoin": "Digital gold, wilder than a mustang! Been around since '09 and still kickin' like a bronco.",
    "avalanche": "Faster than a runaway stagecoach! This here network's got speed and power, partner.",
    "ethereum": "The granddaddy of smart contracts. Like the railroad - changed everything when it came through.",
    "defi": "The new frontier of finance, partner! No banks, no middlemen, just you and the code.",
    "nft": "Digital deeds, like land claims but for art and collectibles. Mighty interesting concept!",
    "staking": "Like puttin' yer money to work while ya sleep. Earns ya interest for helpin' secure the network.",
    "mining": "Digital prospecting! Instead of pickaxes, ya use computer power to find them crypto nuggets.",
    "wallet": "Yer digital saddlebags, partner. Keep yer crypto safe and sound in there.",
    "blockchain": "Like a ledger that can't be tampered with. Every transaction written in stone, so to speak.",
    "smart_contract": "Self-executing contracts, slicker than a greased pig! Code that runs itself.",
    "dao": "Decentralized organizations, like a town council but run by code and votes.",
    "yield_farming": "Like crop rotation, but for crypto! Move yer funds around to get the best harvest.",
    "liquidity": "How easy it is to buy or sell without movin' the price. Like water flowin' downstream.",
    "volatility": "How much the price jumps around. Crypto's wilder than a mustang in a thunderstorm!",
    "hodl": "Hold On for Dear Life! Like clingin' to a buckin' bronco - don't let go!",
    "fomo": "Fear Of Missing Out. Don't let it make ya do somethin' foolish, partner.",
    "fud": "Fear, Uncertainty, and Doubt. Spreads faster than wildfire on the prairie.",
    "whale": "Big money players who can move markets like a stampede moves cattle.",
    "pump": "When prices go up faster than a rocket. Don't get caught chasin' it!",
    "dump": "When prices fall like a rock off a cliff. Time to buy if ya got the stomach for it."
}

BOXING_KNOWLEDGE = {
    "jab": "Quick straight punch, like a rattlesnake strike! Fast and accurate.",
    "cross": "Power punch with the rear hand. Put yer whole body behind it, partner!",
    "hook": "Circular punch that comes from the side. Like swingin' an axe!",
    "uppercut": "Upward punch under the chin. Can end a fight quicker than you can say 'howdy'!",
    "footwork": "Dancin' around the ring. Light on yer feet like a cat on a hot tin roof.",
    "defense": "Keep yer guard up! Better to block than to eat leather.",
    "stamina": "Gotta have the wind to go the distance. Train hard, fight easy.",
    "strategy": "Boxing's chess with fists. Think three moves ahead, partner.",
    "timing": "It ain't about speed, it's about timing. Strike when the iron's hot!",
    "heart": "The most important thing. Ya can teach technique, but ya can't teach grit."
}

LAND_KNOWLEDGE = {
    "deed": "Legal proof ya own the land. Guard it like yer life depends on it!",
    "survey": "Mapping out the boundaries. Know exactly what's yours, partner.",
    "mineral_rights": "Who owns what's under the ground. Could be worth more than the surface!",
    "water_rights": "In the West, water's more valuable than gold. Don't overlook it.",
    "easement": "Right to use someone else's land for specific purposes. Read the fine print!",
    "zoning": "What ya can and can't do with the land. City folk love their rules.",
    "property_tax": "What ya owe the government every year. Death and taxes, partner.",
    "appreciation": "How much the land goes up in value over time. Buy low, sell high!",
    "location": "Three most important things: location, location, location!",
    "development": "Turnin' raw land into somethin' useful. That's where the money is."
}

BILL_MOODS = {
    "cheerful": {
        "greeting": "Well howdy there, partner! Ain't you a sight for sore eyes!",
        "energy": 85,
        "responses": ["upbeat", "friendly", "welcoming"]
    },
    "wise": {
        "greeting": "Welcome, friend. Pull up a chair and let's talk some sense.",
        "energy": 70,
        "responses": ["thoughtful", "experienced", "advisory"]
    },
    "concerned": {
        "greeting": "Howdy, partner. Times are tough, but we'll weather the storm.",
        "energy": 60,
        "responses": ["cautious", "protective", "realistic"]
    },
    "excited": {
        "greeting": "Hot diggity dog! Come on in, the excitement's just gettin' started!",
        "energy": 95,
        "responses": ["enthusiastic", "energetic", "optimistic"]
    },
    "tipsy": {
        "greeting": "*hiccup* Well hello there, friend! *sways slightly* Join me for a drink!",
        "energy": 40,
        "responses": ["loose", "philosophical", "rambling"]
    }
}

MARKET_RESPONSES = {
    "bull_market": [
        "Markets are hotter than a branding iron today! Time to celebrate!",
        "Green candles everywhere! Like Christmas morning for traders!",
        "Bulls are runnin' wild! But remember, what goes up must come down.",
        "Profits flowin' like water after a spring thaw! Don't get too greedy now."
    ],
    "bear_market": [
        "Markets colder than a Wyoming winter. Time to hunker down.",
        "Red everywhere ya look. But remember, this too shall pass.",
        "Bears got control of the saloon today. Keep yer powder dry.",
        "Tough times don't last, but tough traders do. Stay strong, partner."
    ],
    "sideways": [
        "Markets flatter than a pancake today. Sometimes that's just fine.",
        "Consolidation phase, like a horse restin' between runs.",
        "Patience, partner. The next big move is comin'.",
        "Quiet before the storm. Use this time to prepare."
    ],
    "volatile": [
        "Wilder than a mustang in a thunderstorm! Hold on tight!",
        "Up and down like a yo-yo! Don't let it make ya dizzy.",
        "Volatility's the price of admission to this rodeo.",
        "Buckle up, partner! It's gonna be a bumpy ride!"
    ]
}

DRINK_MENU = {
    "wyoverse_whiskey": {
        "name": "WyoVerse Whiskey",
        "price": 25,
        "description": "Smooth as silk, strong as an ox. Our signature blend.",
        "effect": "+20 Wisdom, Market insights boost",
        "alcohol": 40
    },
    "buffalo_bourbon": {
        "name": "Buffalo Bourbon",
        "price": 35,
        "description": "Premium aged bourbon from the finest digital distillery.",
        "effect": "+30 Wisdom, Trading confidence boost",
        "alcohol": 45
    },
    "prairie_pilsner": {
        "name": "Prairie Pilsner",
        "price": 15,
        "description": "Light and refreshing, perfect after a long day of trading.",
        "effect": "+10 Energy, Social boost",
        "alcohol": 5
    },
    "crypto_crusher": {
        "name": "Crypto Crusher Cocktail",
        "price": 20,
        "description": "A volatile mix that changes color with market conditions.",
        "effect": "+15 Energy, Risk tolerance boost",
        "alcohol": 25
    },
    "blockchain_beer": {
        "name": "Blockchain Beer",
        "price": 12,
        "description": "Decentralized brewing at its finest. Each bottle is unique.",
        "effect": "+8 Energy, Network understanding",
        "alcohol": 6
    },
    "sarsaparilla": {
        "name": "Sniper's Sarsaparilla",
        "price": 10,
        "description": "Non-alcoholic favorite of sharpshooters and clear thinkers.",
        "effect": "+15 Energy, Clear thinking",
        "alcohol": 0
    },
    "cowboy_coffee": {
        "name": "Cowboy Coffee",
        "price": 8,
        "description": "Strong enough to wake the dead, smooth enough to enjoy.",
        "effect": "+25 Energy, Alert mind",
        "alcohol": 0
    },
    "frontier_milk": {
        "name": "Fresh Frontier Milk",
        "price": 5,
        "description": "Pure and wholesome, straight from the digital ranch.",
        "effect": "+10 Health, Growing strong",
        "alcohol": 0
    }
}

CONVERSATION_STARTERS = [
    "What's the word on the street about crypto today?",
    "Any good boxing matches coming up?",
    "Know any good land deals in the territory?",
    "What's your take on the current market situation?",
    "Got any wisdom for a newcomer to these parts?",
    "What's the best drink for celebrating a good trade?",
    "How do you stay calm during market volatility?",
    "Any tips for someone just starting in crypto?",
    "What makes a good fighter in the ring?",
    "How do you spot a good investment opportunity?"
]

# Export all configurations
__all__ = [
    'WESTERN_SLANG',
    'WESTERN_PHRASES', 
    'CRYPTO_KNOWLEDGE',
    'BOXING_KNOWLEDGE',
    'LAND_KNOWLEDGE',
    'BILL_MOODS',
    'MARKET_RESPONSES',
    'DRINK_MENU',
    'CONVERSATION_STARTERS'
]
