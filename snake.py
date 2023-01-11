import csv
import json

# Open the CSV file
with open('Payroll_data_sample.csv') as f:
    reader = csv.reader(f)
    # Skip the first line (header row)
    next(reader)
    data = {'names': []}

    unique_values = set()
    for row in reader:
        if row[8] not in unique_values:
            # Add the value to the set and append it to the list
            unique_values.add(row[8])
            data['names'].append({"lastname": row[8]})

# Save the JSON data
with open("csv-to-json.json", "w") as f:
    json.dump(data, f, indent=4)
