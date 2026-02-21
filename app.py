from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/pomodoro")
def pomodoro():
    return render_template("pomodoro.html")

@app.route("/study_methods")
def study_methods():
    return render_template("study_methods.html")

@app.route("/sdg")
def sdg():
    return render_template("sdg.html")

@app.route("/nim")
def nim():
    return render_template("nim.html")

@app.route("/flashcards")
def flashcards():
    return render_template("flashcards.html")

@app.route("/grades_calculator")
def grades_calc():
    return render_template("grades_calc.html")

@app.route("/documentations")
def docs():
    return render_template("docs.html")

@app.route("/documentations/pythagorean-theorum")
def pyth_theo():
    return render_template("pythagorean_theorum.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
