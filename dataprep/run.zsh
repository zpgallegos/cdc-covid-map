base=data/united_states_covid19_deaths_ed_visits_and_positivity_by_state
infile=$base.csv
outfile=$base.json
cpd=../covid-react-viz/src/data/properties.json

python preprocess.py --infile $infile
cp $outfile ../covid-react-viz/src/data/properties.json
