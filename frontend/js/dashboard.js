const API_BASE_URL = 'http://127.0.0.1:5000/api';

let dataTableInstance = null;

async function initializeDashboard() {
    try {
        const response = await fetch(
            `${API_BASE_URL}/table-data`
        );

        const result = await response.json();

        const visibleColumns = result.columns.filter(
            column => column.display === true
        );

        $('#leadTable').empty();
        createTableHeader(visibleColumns);
        initializeDataTable(
            visibleColumns,
            result.rows
        );

    } catch (error) {
        console.error(
            'Dashboard initialization failed:',
            error
        );
    }
}

function createTableHeader(columns) {

    const headerRow = $('<tr></tr>');
    const footerRow = $('<tr></tr>');

    columns.forEach(column => {
        headerRow.append(`
            <th>
                ${column.title}
            </th>
        `);

        footerRow.append(`
            <th>
                <select 
                    class="column-filter form-control"
                    data-column="${column.data}"
                >
                    <option value="">
                        All
                    </option>
                </select>
            </th>
        `);
    });

    $('#leadTable').append(
        $('<thead></thead>').append(headerRow)
    );

    $('#leadTable').append(
        $('<tfoot></tfoot>').append(footerRow)
    );
}

function initializeDataTable(columns, rows) {

    const dataTableColumns = columns.map(column => {

        if (column.type === 'status') {
            return {
                data: column.data,
                title: column.title,

                render: function (data, type) {

                    if (
                        type === 'filter' ||
                        type === 'sort'
                    ) {
                        return data;
                    }

                    let badgeClass = 'status-pending';

                    if (data === 'Accepted') {
                        badgeClass = 'status-accepted';
                    }
                    else if (data === 'Rejected') {
                        badgeClass = 'status-rejected';
                    }

                    return `
                        <span class="
                            status-badge
                            ${badgeClass}
                        ">
                            ${data}
                        </span>
                    `;
                }
            };
        }

        return {
            data: column.data,
            title: column.title
        };
    });

    if ($.fn.DataTable.isDataTable('#leadTable')) {
        $('#leadTable').DataTable().destroy();
    }

    dataTableInstance = $('#leadTable').DataTable({
        data: rows,
        columns: dataTableColumns,
        pageLength: 10,
        responsive: true,
        ordering: true,
        searching: true,
        info: true,
        autoWidth: false,
        destroy: true,
        order: []
    });

    populateAllFilters();

    $('.column-filter').on(
        'change',
        function () {
            applyFilters();
            populateAllFilters();
        }
    );
}

function applyFilters() {
    dataTableInstance.columns().every(function (index) {

        const column = this;

        const selectedValue = $(
            $('.column-filter')[index]
        ).val();

        const escapedValue =
            $.fn.dataTable.util.escapeRegex(
                selectedValue
            );

        column.search(
            escapedValue
                ? '^' + escapedValue + '$'
                : '',
            true,
            false
        );
    });

    dataTableInstance.draw();
}

function populateAllFilters() {

    const filteredRows = dataTableInstance
        .rows({ search: 'applied' })
        .data()
        .toArray();

    dataTableInstance.columns().every(function (index) {

        const column = this;

        const columnName =
            dataTableInstance.settings()
                .init()
                .columns[index]
                .data;

        const select = $(
            $('.column-filter')[index]
        );

        const currentSelectedValue =
            select.val();

        select.empty();

        select.append(`
            <option value="">
                All
            </option>
        `);

        const uniqueValues = new Set();

        filteredRows.forEach(row => {

            const value = row[columnName];

            if (
                value !== null &&
                value !== undefined &&
                value !== ''
            ) {
                uniqueValues.add(value);
            }
        });

        Array.from(uniqueValues)
            .sort()
            .forEach(value => {

                select.append(`
                    <option value="${value}">
                        ${value}
                    </option>
                `);
            });

        if (
            currentSelectedValue &&
            uniqueValues.has(currentSelectedValue)
        ) {
            select.val(currentSelectedValue);
        }
    });
}

$(document).ready(function () {

    initializeDashboard();
});