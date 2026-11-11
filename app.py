from flask import Flask, render_template
import json

app = Flask(__name__)

with open(app.static_folder + "/projects.json", encoding="utf-8") as f:
    project_list = json.load(f)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/now/")
def now():
    return render_template("now.html")


@app.route("/projects/")
def projects():
    return render_template("projects.html", projects=project_list)


@app.route("/photo/")
def photo():
    return render_template("photo.html")


@app.route("/guest/")
def guest():
    return render_template("guest.html")


@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html"), 404


if __name__ == "__main__":
    app.run(debug=True)
