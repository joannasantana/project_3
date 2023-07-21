# Import the dependencies.
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect, text

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Output/malaria.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save references to each table
cases = Base.classes.cases
deaths = Base.classes.deaths
rates = Base.classes.rates
mortality = Base.classes.mortality

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
@app.route("/")
def usage():
    return """
    Available routes:<br/>
    /api/v1.0/cases<br/>
    /api/v1.0/deaths<br/>
    /api/v1.0/rates<br/>
    /api/v1.0/mortality<br/>
    """

@app.route("/api/v1.0/cases")
def cases():
    with Session(bind=engine) as session:
        cases_dict = {}
        last_country = ""
        data = session.query(cases).order_by(cases.Country).all()
        for row in data:
            current_country = cases.Country
            if current_country != last_country:
                if last_country != "":
                    cases_dict[last_country] = {
                        "Region": cases.Region,
                        "Years": years_dict
                    }
                years_dict = {}
                years_dict[cases.Year] = cases.Num_Cases
                last_country = current_country
            else:
                years_dict[cases.Year] = cases.Num_Cases
        return jsonify(cases_dict)

# @app.route("/api/v1.0/deaths")

# @app.route("/api/v1.0/rates")
    
# @app.route("/api/v1.0/mortality")    


if __name__ == "__main__":
    app.run(debug=True)

# Close Session
session.close()