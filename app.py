# Import the dependencies.
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect, text
import numpy as np

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
def cases_func():
    with Session(bind=engine) as session:
        cases_dict = {}
        last_country = ""
        data = session.query(cases.Region, cases.Country, cases.Year, cases.Num_Cases).order_by(cases.Country).all()
        data_list = []
        for tuple in data:
            tuple_as_list = list(np.ravel(tuple))
            data_list.append(tuple_as_list)
        for item in data_list:
            current_country = item[1]
            if current_country != last_country:
                if last_country != "":
                    cases_dict[last_country] = {
                        "Region": item[0],
                        "Years": years_dict
                    }
                years_dict = {}
                years_dict[item[2]] = item[3]
                last_country = current_country
            else:
                years_dict[item[2]] = item[3]
        return jsonify(cases_dict)

@app.route("/api/v1.0/deaths")
def deaths_func():
    with Session(bind=engine) as session:
            deaths_dict = {}
            last_country = ""
            data = session.query(deaths.Region, deaths.Country, deaths.Year, deaths.Num_Deaths).order_by(deaths.Country).all()
            data_list = []
            for tuple in data:
                tuple_as_list = list(np.ravel(tuple))
                data_list.append(tuple_as_list)
            for item in data_list:
                current_country = item[1]
                if current_country != last_country:
                    if last_country != "":
                        deaths_dict[last_country] = {
                            "Region": item[0],
                            "Years": years_dict
                        }
                    years_dict = {}
                    years_dict[item[2]] = item[3]
                    last_country = current_country
                else:
                    years_dict[item[2]] = item[3]
            return jsonify(deaths_dict)

@app.route("/api/v1.0/rates")
def rates_func():
    with Session(bind=engine) as session:
            rates_dict = {}
            last_country = ""
            data = session.query(rates.Region, rates.Country, rates.Year, rates.Incidence_Rate).order_by(rates.Country).all()
            data_list = []
            for tuple in data:
                tuple_as_list = list(np.ravel(tuple))
                data_list.append(tuple_as_list)
            for item in data_list:
                current_country = item[1]
                if current_country != last_country:
                    if last_country != "":
                        rates_dict[last_country] = {
                            "Region": item[0],
                            "Years": years_dict
                        }
                    years_dict = {}
                    years_dict[item[2]] = item[3]
                    last_country = current_country
                else:
                    years_dict[item[2]] = item[3]
            return jsonify(rates_dict)
        
@app.route("/api/v1.0/mortality")
def mortality_func():
    with Session(bind=engine) as session:
            mortality_dict = {}
            last_country = ""
            data = session.query(mortality.Region, mortality.Country, mortality.Year, mortality.Mortality_Rate).order_by(mortality.Country).all()
            data_list = []
            for tuple in data:
                tuple_as_list = list(np.ravel(tuple))
                data_list.append(tuple_as_list)
            for item in data_list:
                current_country = item[1]
                if current_country != last_country:
                    if last_country != "":
                        mortality_dict[last_country] = {
                            "Region": item[0],
                            "Years": years_dict
                        }
                    years_dict = {}
                    years_dict[item[2]] = item[3]
                    last_country = current_country
                else:
                    years_dict[item[2]] = item[3]
            return jsonify(mortality_dict)    


if __name__ == "__main__":
    app.run(debug=True)

# Close Session
session.close()