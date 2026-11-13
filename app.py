from flask import Flask, render_template
import json
from flask_sitemapper import Sitemapper

sitemapper = Sitemapper()

app = Flask(__name__)
sitemapper.init_app(app)

with open(app.static_folder + "/projects.json", encoding="utf-8") as f:
    project_list = json.load(f)

@sitemapper.include()
@app.route("/")
def index():
    return render_template("index.html")

@sitemapper.include()
@app.route("/now/")
def now():
    return render_template("now.html")

@sitemapper.include()
@app.route("/projects/")
def projects():
    return render_template("projects.html", projects=project_list)

@sitemapper.include()
@app.route("/photo/")
def photo():
    return render_template("photo.html")

@sitemapper.include()
@app.route("/guest/")
def guest():
    return render_template("guest.html")

@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html"), 404

@sitemapper.include()
@app.route("/sitemap.xml")
def sitemap():
  return sitemapper.generate()

if __name__ == "__main__":
    app.run(debug=True)
