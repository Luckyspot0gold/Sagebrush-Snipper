# deploy_bot.py (Run anywhere)
import os
import click

@click.command()
@click.option('--exchange', default='coinbase', help='Exchange: coinbase, binance, etc.')
def deploy_sniper(exchange):
    """Auto-configures SageBrush_Sniper for trading"""
    # 1. Detect environment
    if "COINBASE_API_KEY" not in os.environ:
        click.echo("⚠️ Missing API key! Run: export COINBASE_API_KEY=your_key")
        return
    
    # 2. Write config
    with open("config/trading.yaml", "w") as f:
        f.write(f"exchange: {exchange}\n")
        f.write(f"api_key: {os.environ['COINBASE_API_KEY']}")
    
    # 3. Launch bot
    os.system("python sagebrush_sniper.py --prod")
    click.echo("✅ Sniper bot deployed! Tracking BTC-USD...")

if __name__ == "__main__":
    deploy_sniper()
    # 1. Install tools
pip install chipy-tools

# 2. Configure bot
chipy setup --wallet=rabby --exchange=coinbase

# 3. Deploy
chipy deploy --bot=sniper --strategy=aggressive