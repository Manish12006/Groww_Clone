from flask import Flask, send_from_directory, jsonify, request
import yfinance as yf
import plotly.graph_objects as go
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def fetch_stock_data(ticker, period):
    stock = yf.Ticker(ticker)
    hist = stock.history(period=period)
    df = hist.reset_index()
    return df

def plot_stock_data(df, period):
    fig = go.Figure()

    # Add trace for stock price
    fig.add_trace(go.Scatter(x=df['Date'], y=df['Close'],
                             mode='lines',
                             name='Close Price',
                             line=dict(color='rgb(0,178,135)')
                             ))

    # Update layout
    fig.update_layout(
                      xaxis_title='Date',
                      yaxis_title='Price',
                      hovermode='x unified',
                      plot_bgcolor='white',
                      paper_bgcolor='white',
                      xaxis=dict(showgrid=False, gridcolor='#FFFFFF'),
                      yaxis=dict(showgrid=False, gridcolor='#FFFFFF'),
                      )

    # Display the figure in a browser
    fig.write_html(f'zomato_stock_chart_{period}.html')
    fig.write_html(f'tatasteel_stock_chart_{period}.html')
    fig.write_html(f'hdfc_{period}.html')
    fig.write_html(f'sbi_{period}.html')
    fig.write_html(f'tcs_{period}.html')

@app.route('/zomatochart')
def serve_chart():
    period = request.args.get('period', '1y')  # Default to 1 year if no period is provided
    ticker = "ZOMATO.NS"
    data = fetch_stock_data(ticker, period)
    if not data.empty:
        plot_stock_data(data, period)
        return send_from_directory('.', f'zomato_stock_chart_{period}.html')
    else:
        return "No data available for the given ticker."

@app.route('/zomato_latest_price')
def serve_latest_price():
    ticker = "ZOMATO.NS"
    latest_price = fetch_latest_price(ticker)
    return jsonify(latest_price)



def fetch_latest_price(ticker):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="1d")
    latest_price = hist['Close'].iloc[-1]  # Get the latest closing price
    return latest_price

@app.route('/zomato_monthly_high')
def serve_monthly_high():
    ticker = "ZOMATO.NS"
    low, high = fetch_monthly_high(ticker)
    return jsonify(high) 
   
    
def fetch_monthly_high(ticker):
    stock = yf.Ticker(ticker)
    now = datetime.now()
    start_of_month = now.replace(day=1)
    hist = stock.history(start=start_of_month, end=now)
    if not hist.empty:
        monthly_low = hist['Low'].min()
        monthly_high = hist['High'].max()
        return monthly_low, monthly_high
    else:
        return None, None
    
@app.route('/zomato_monthly_low')
def serve_monthly_low():
    ticker = "ZOMATO.NS"
    low, high = fetch_monthly_low(ticker)
    
    if low is not None and high is not None:
        return jsonify({"low": f"Low Value : {low:.2f}"})
    else:
        return jsonify({"error": "No data available for the given ticker."})
    
def fetch_monthly_low(ticker):
    stock = yf.Ticker(ticker)
    now = datetime.now()
    start_of_month = now.replace(day=1)
    hist = stock.history(start=start_of_month, end=now)
    if not hist.empty:
        monthly_low = hist['Low'].min()
        monthly_high = hist['High'].max()
        return monthly_low, monthly_high
    else:
        return None, None
    
@app.route('/tatasteelchart')
def serve_charttatasteel():
    period = request.args.get('period', '1y')  # Default to 1 year if no period is provided
    ticker = "TATASTEEL.NS"
    data = fetch_stock_data(ticker, period)
    if not data.empty:
        plot_stock_data(data, period)
        return send_from_directory('.', f'tatasteel_stock_chart_{period}.html')
    else:
        return "No data available for the given ticker."
    
@app.route('/hdfcchart')
def serve_charthdfc():
    period = request.args.get('period', '1y')  # Default to 1 year if no period is provided
    ticker = "HDFCBANK.NS"
    data = fetch_stock_data(ticker, period)
    if not data.empty:
        plot_stock_data(data, period)
        return send_from_directory('.', f'hdfc_{period}.html')
    else:
        return "No data available for the given ticker."
    
@app.route('/sbichart')
def serve_chartsbi():
    period = request.args.get('period', '1y')  # Default to 1 year if no period is provided
    ticker = "SBIN.NS"
    data = fetch_stock_data(ticker, period)
    if not data.empty:
        plot_stock_data(data, period)
        return send_from_directory('.', f'sbi_{period}.html')
    else:
        return "No data available for the given ticker."
    
@app.route('/tcschart')
def serve_charttcs():
    period = request.args.get('period', '1y')  # Default to 1 year if no period is provided
    ticker = "TCS.NS"
    data = fetch_stock_data(ticker, period)
    if not data.empty:
        plot_stock_data(data, period)
        return send_from_directory('.', f'tcs_{period}.html')
    else:
        return "No data available for the given ticker."

print("Server started with updated code")

if __name__ == "__main__":
    app.run(debug=True)
