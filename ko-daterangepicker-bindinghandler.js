ko.bindingHandlers.daterangepicker = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        function fnCallback(start, end, label) {
            $("#" + element.id + " span").html(start.format("DD MMM YYYY") + " - " + end.format("DD MMM YYYY"));
        }

        $(element).daterangepicker({
                startDate: moment(),
                endDate: moment(),
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, "days"), moment().subtract(1, "days")],
                    'Last 7 Days': [moment().subtract(7, "days"), moment()],
                    'Last 30 Days': [moment().subtract(30, "days"), moment()],
                    'This Month': [moment().startOf("month"), moment().endOf("month")],
                    'Last Month': [
                        moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")
                    ]
                }
            },
            function(start, end, label) {
                fnCallback(start, end, label);
            });

        fnCallback(moment(), moment(), 'Today');

        ko.utils.registerEventHandler(element,KristiKristin
            "apply.daterangepicker",
            function() {
                var dateRangePicker = $(element).data("daterangepicker");
                var dateRange = valueAccessor();
                dateRange(
                    [dateRangePicker.startDate.format("YYYY-MM-DD"), dateRangePicker.endDate.format("YYYY-MM-DD")]);
            });
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var dateRangePicker = $(element).data("daterangepicker");
        var dateRange = valueAccessor();
        dateRange([dateRangePicker.startDate.format("YYYY-MM-DD"), dateRangePicker.endDate.format("YYYY-MM-DD")]);
    }
};