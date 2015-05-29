Chart.defaults.global = {
    // Boolean - Whether to animate the chart
    animation: true,
    // Number - Number of animation steps
    animationSteps: 60,

    // String - Animation easing effect
    // Possible effects are:
    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
    //  easeOutElastic, easeInCubic]
    animationEasing: "easeOutQuart",

    // Boolean - If we should show the scale at all
    showScale: true,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: false,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: null,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: null,
    // Number - The scale starting value
    scaleStartValue: null,

    // String - Colour of the scale line
    scaleLineColor: "rgba(0,0,0,.1)",

    // Number - Pixel width of the scale line
    scaleLineWidth: 1,

    // Boolean - Whether to show labels on the scale
    scaleShowLabels: true,

    // Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
    scaleIntegersOnly: true,

    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: 12,

    // String - Scale label font weight style
    scaleFontStyle: "normal",

    // String - Scale label font colour
    scaleFontColor: "#666",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: false,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,

    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
    customTooltips: false,

    // Array - Array of string names to attach tooltip events
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

    // String - Tooltip background colour
    tooltipFillColor: "rgba(0,0,0,0.8)",

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: "normal",

    // String - Tooltip label font colour
    tooltipFontColor: "#fff",

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 14,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: "bold",

    // String - Tooltip title font colour
    tooltipTitleFontColor: "#fff",

    // Number - pixel width of padding around tooltip text
    tooltipYPadding: 6,

    // Number - pixel width of padding around tooltip text
    tooltipXPadding: 6,

    // Number - Size of the caret on the tooltip
    tooltipCaretSize: 8,

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 6,

    // Number - Pixel offset from point x to tooltip edge
    tooltipXOffset: 10,

    // String - Template string for single tooltips
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

    // String - Template string for multiple tooltips
    multiTooltipTemplate: "<%= value %>",

    // Function - Will fire on animation progression.
    onAnimationProgress: function(){},

    // Function - Will fire on animation completion.
    onAnimationComplete: function(){}
}
var dataid_1={
    labels:[],
    datasets:[
        {
            label: "Chart :)",
            fillColor: "rgba(220,30,20,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: []
        }
    ]
};
var helpersid_1=Chart.helpers;
var help_val2=0;
var myBarChartid_1;
function newData(playersid_1,initValueid_1,canvas_objid_1)
{
    update_var2=playersid_1;
    update_var=0;
    while( dataid_1.labels.length!=0)
    {
        dataid_1.labels.pop();
        dataid_1.datasets[0].data.pop();
    }
    for(var xid_1=0;xid_1<playersid_1;xid_1++)
    {
        var help_varid_1=xid_1+1;
        dataid_1.labels.push("Gracz"+help_varid_1);
        dataid_1.datasets[0].data.push(initValueid_1);
    }
    var canvasid_1=canvas_objid_1;
    var ctxid_1 = canvasid_1.getContext("2d");
    if(help_val2==0) {
         myBarChartid_1 = new Chart(ctxid_1).Bar(dataid_1, {
            animation: true,
            showScale: true,
            barShowStroke: true,
            tooltipXPadding: 10,
            tooltipYPadding: 6,
            tooltipFontSize: 18,
            tooltipFontStyle: 'bold',
            // Boolean - If we want to override with a hard coded scale
            scaleOverride: true,

            // ** Required if scaleOverride is true **
            // Number - The number of steps in a hard coded scale
            scaleSteps: initValueid_1 / 25,
            // Number - The value jump in the hard coded scale
            scaleStepWidth: 25,
            // Number - The scale starting value
            scaleStartValue: 0
        });
        help_val2=1;
    }
    else
    {
        myBarChartid_1.destroy();
        myBarChartid_1 = new Chart(ctxid_1).Bar(dataid_1, {
            animation: true,
            showScale: true,
            barShowStroke: true,
            tooltipXPadding: 10,
            tooltipYPadding: 6,
            tooltipFontSize: 18,
            tooltipFontStyle: 'bold',
            // Boolean - If we want to override with a hard coded scale
            scaleOverride: true,

            // ** Required if scaleOverride is true **
            // Number - The number of steps in a hard coded scale
            scaleSteps: initValueid_1 / 25,
            // Number - The value jump in the hard coded scale
            scaleStepWidth: 25,
            // Number - The scale starting value
            scaleStartValue: 0
        });
    }

    return myBarChartid_1;
}

var update_var;
var update_var2;
function updateSelectedBar(myBarChartid_1)
{
    myBarChartid_1.datasets[0].bars[Math.floor(update_var/3)].fillColor="rgba(20,220,20,0.5)";
    if(Math.floor(update_var/3)==0)myBarChartid_1.datasets[0].bars[update_var2-1].fillColor="rgba(220,30,20,0.5)";
    else myBarChartid_1.datasets[0].bars[Math.floor(update_var/3)-1].fillColor="rgba(220,30,20,0.5)";
    update_var++;
    if(Math.floor(update_var/3)>=update_var2)update_var=0;
    myBarChartid_1.update();
}
function changeValueOfPlayer(player_nrid_1, scoreid_1,myBarChartid_1)
{
    if(myBarChartid_1.datasets[0].bars[player_nrid_1-1].value-scoreid_1>=0)
        myBarChartid_1.datasets[0].bars[player_nrid_1-1].value-=scoreid_1;
    else
    {
        return -10;//oznacza przekroczenie wartoœci
    }
    myBarChartid_1.update();
    if(myBarChartid_1.datasets[0].bars[player_nrid_1-1].value==0)return 10;//oznacza wygran¹
}
function setValueOfPlayerBar(player_nrid_1,new_value)
{
    myBarChartid_1.datasets[0].bars[player_nrid_1-1].value=new_value;
}
function getValueOfPlayer(player_nrid_1,myBarChartid_1)
{
    return myBarChartid_1.datasets[0].bars[player_nrid_1-1].value;
}
function winnerFunction(player_nrid_1,myBarChartid_1)
{
    myBarChartid_1.datasets[0].bars[player_nrid_1-1].fillColor="rgba(255,215,0,0.5)";
    myBarChartid_1.datasets[0].bars[player_nrid_1-1].value=200;
    myBarChartid_1.update();
}
// changeValueOfPlayer(10,20,barChart_obj);