import os

from flask import Flask, render_template

from config import Config


app = Flask(__name__)
app.config.from_object(Config)


def render_page(active_tab):
    return render_template("index.html", config=Config, active_tab=active_tab)


@app.route("/")
def home():
    return render_page("home")


@app.route("/dashboard")
def dashboard():
    return render_page("dashboard")


@app.route("/story")
def story():
    return render_page("story")


@app.route("/insights")
def insights():
    return render_page("insights")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="127.0.0.1", port=port, debug=True)
