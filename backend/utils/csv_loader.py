import pandas as pd


CSV_PATH = 'data/leads.csv'


def load_csv_data():

    dataframe = pd.read_csv(CSV_PATH)

    dataframe['timestamp'] = pd.to_datetime(
        dataframe['timestamp'],
        errors='coerce'
    )

    dataframe = dataframe.fillna('')

    return dataframe