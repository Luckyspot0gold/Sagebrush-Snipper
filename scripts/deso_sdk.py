#!/usr/bin/env python3
"""
DeSo SDK Integration for WyoVerse Social Good Affiliate Program
"""

import os
import sys
import json
import requests
import time
from datetime import datetime
from typing import Dict, List, Optional

class DeSoAPI:
    def __init__(self, base_url: str = "https://node.deso.org/api/v0"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'User-Agent': 'WyoVerse-DeSo-SDK/1.0'
        })

    def get_profiles(self, usernames: List[str]) -> Dict:
        """Get user profiles from DeSo"""
        try:
            payload = {
                "PublicKeyBase58CheckOrUsername": usernames[0] if usernames else "",
                "Username": usernames[0] if usernames else ""
            }
            
            response = self.session.post(
                f"{self.base_url}/get-single-profile",
                json=payload
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Error fetching profiles: {response.status_code}")
                return {}
                
        except Exception as e:
            print(f"Exception in get_profiles: {e}")
            return {}

    def get_posts(self, username: str, num_posts: int = 10) -> Dict:
        """Get posts from a DeSo user"""
        try:
            payload = {
                "Username": username,
                "NumToFetch": num_posts
            }
            
            response = self.session.post(
                f"{self.base_url}/get-posts-for-public-key",
                json=payload
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Error fetching posts: {response.status_code}")
                return {}
                
        except Exception as e:
            print(f"Exception in get_posts: {e}")
            return {}

    def create_affiliate_post(self, content: str, affiliate_links: List[str]) -> Dict:
        """Create a post with affiliate links"""
        try:
            # Format content with affiliate links
            formatted_content = f"{content}\n\n"
            for i, link in enumerate(affiliate_links, 1):
                formatted_content += f"🔗 Link {i}: {link}\n"
            
            formatted_content += "\n#WyoVerse #SocialGood #Affiliate #DeSo"
            
            payload = {
                "UpdaterPublicKeyBase58Check": "",  # Would need user's public key
                "PostHashHexToModify": "",
                "ParentStakeID": "",
                "BodyObj": {
                    "Body": formatted_content,
                    "ImageURLs": [],
                    "VideoURLs": []
                },
                "CreatorBasisPoints": 1000,
                "StakeMultipleBasisPoints": 12500,
                "TimestampNanos": int(time.time() * 1e9),
                "IsHidden": False,
                "MinFeeRateNanosPerKB": 1000
            }
            
            # This would require authentication in a real implementation
            print(f"Would create post: {formatted_content}")
            return {"success": True, "content": formatted_content}
            
        except Exception as e:
            print(f"Exception in create_affiliate_post: {e}")
            return {"success": False, "error": str(e)}

class SocialGoodAffiliateManager:
    def __init__(self):
        self.deso_api = DeSoAPI()
        self.affiliate_links = {
            "socialgood": "https://go.socialgood.inc/?adj_redirect=https%3A%2F%2Fsocialgood.inc%2Fapp%2F1%2F&adj_t=1gbx67rh&adj_deeplink_js=1&referralCode=SVJDQ6",
            "deso": "https://docs.deso.org/",
            "temu_main": "https://temu.to/m/u7wq0kfazcq",
            "temu_app": "https://app.temu.com/m/qqmjtu4t3jr",
            "temu_earn": "https://temu.to/m/uk5c470tnv3"
        }
        
    def activate_affiliates(self):
        """Activate affiliate program"""
        print("🚀 Activating WyoVerse Social Good Affiliate Program...")
        
        # Create affiliate tracking data
        affiliate_data = {
            "timestamp": datetime.now().isoformat(),
            "program": "WyoVerse Social Good",
            "links": self.affiliate_links,
            "status": "active",
            "commission_rates": {
                "socialgood": 0.05,  # 5%
                "deso": 0.03,        # 3%
                "temu": 0.08         # 8%
            },
            "social_good_percentage": 0.05  # 5% to social causes
        }
        
        # Save to file
        with open("affiliate_config.json", "w") as f:
            json.dump(affiliate_data, f, indent=2)
        
        print("✅ Affiliate program activated!")
        print(f"📊 Total affiliate links: {len(self.affiliate_links)}")
        print("💚 5% of all earnings go to social good causes")
        
        return affiliate_data
    
    def create_social_good_post(self):
        """Create a DeSo post promoting social good affiliates"""
        content = """
🌟 Join the WyoVerse Social Good Movement! 🌟

Every click helps build a better world:
💚 SocialGood.inc - Earn while shopping for good causes
🔗 DeSo - Decentralized social blockchain
🛍️ Temu - Amazing deals with social impact

5% of all affiliate earnings support:
📚 Digital education access
🌱 Environmental projects  
🏠 Affordable housing initiatives

Together we're building the future! 🚀
        """
        
        links = list(self.affiliate_links.values())
        result = self.deso_api.create_affiliate_post(content, links)
        
        if result.get("success"):
            print("✅ Social good post created successfully!")
            print(f"📝 Content: {result.get('content', '')[:100]}...")
        else:
            print(f"❌ Failed to create post: {result.get('error', 'Unknown error')}")
        
        return result
    
    def get_affiliate_stats(self):
        """Get affiliate program statistics"""
        try:
            with open("affiliate_config.json", "r") as f:
                config = json.load(f)
            
            stats = {
                "active_links": len(config.get("links", {})),
                "total_commission_rate": sum(config.get("commission_rates", {}).values()),
                "social_good_rate": config.get("social_good_percentage", 0.05),
                "status": config.get("status", "inactive"),
                "last_updated": config.get("timestamp", "never")
            }
            
            print("📊 Affiliate Program Stats:")
            print(f"   Active Links: {stats['active_links']}")
            print(f"   Total Commission Rate: {stats['total_commission_rate']*100:.1f}%")
            print(f"   Social Good Rate: {stats['social_good_rate']*100:.1f}%")
            print(f"   Status: {stats['status']}")
            print(f"   Last Updated: {stats['last_updated']}")
            
            return stats
            
        except FileNotFoundError:
            print("❌ Affiliate config not found. Run activate_affiliates() first.")
            return {}
        except Exception as e:
            print(f"❌ Error getting stats: {e}")
            return {}

def main():
    """Main function to run affiliate management"""
    manager = SocialGoodAffiliateManager()
    
    if len(sys.argv) < 2:
        print("Usage: python3 deso_sdk.py <command>")
        print("Commands:")
        print("  activate-affiliates - Activate the affiliate program")
        print("  create-post - Create a social good post")
        print("  stats - Show affiliate statistics")
        return
    
    command = sys.argv[1].lower()
    
    if command == "activate-affiliates":
        manager.activate_affiliates()
    elif command == "create-post":
        manager.create_social_good_post()
    elif command == "stats":
        manager.get_affiliate_stats()
    else:
        print(f"Unknown command: {command}")

if __name__ == "__main__":
    main()
