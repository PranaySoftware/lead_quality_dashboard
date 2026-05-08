from flask import Blueprint

from utils.csv_loader import load_csv_data


analytics_bp = Blueprint(
    'analytics',
    __name__
)


@analytics_bp.route('/table-data')
def table_data():

    dataframe = load_csv_data()

    rows = dataframe.to_dict(
        orient='records'
    )

    columns = []

    for column in dataframe.columns:

        column_config = {

            'title': (
                column
                .replace('_', ' ')
                .title()
            ),

            'data': column,

            'display': True
        }

        if column == 'lead_id':

            column_config['display'] = False

        if (
            column ==
            'carrier_acceptance_status'
        ):

            column_config['type'] = 'status'

        columns.append(
            column_config
        )

    return {
        'columns': columns,
        'rows': rows
    }