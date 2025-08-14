import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../service/eventservice';
import { SelectItem } from 'primeng/api';
import { Product } from '../domain/product';
import { ProductService } from '../service/productservice';
import { AppBreadcrumbService } from '@accurate/toolbar';
// import { AppMainComponent } from 'src/app/app.main.component';
import { AppComponent } from 'src/app/app.component';
import { AppMainComponent } from '../../layout-components/app.main.component';
import { MenuService } from '@accurate/toolbar';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    //     cities: SelectItem[];

    //     products: Product[];

    //     ordersChart: any;

    //     ordersOptions: any;

    //     chartMonthlyData: any;

    //     chartData: any;

    //     selectedCity: any;

    //     timelineEvents: any[];

    //     overviewChartData1: any;

    //     overviewChartData2: any;

    //     overviewChartData3: any;

    //     overviewChartData4: any;

    //     overviewChartOptions: any;

    //     chatMessages: any[];

    //     chatEmojis: any[];

    //     @ViewChild('chatcontainer') chatContainerViewChild: ElementRef;

    //     constructor(public app: AppComponent, public appMain: AppMainComponent, private productService: ProductService, private eventService: EventService,
    //         private menu: MenuService ,private breadcrumbService: AppBreadcrumbService) {

    //             this.breadcrumbService.setItems([
    //             { label: 'Dashboard', routerLink: ['/'] }
    //         ]);
    //     }

    //     ngOnInit() {
    //         this.menu.selectedMenu = this.menu.menus.find(element => element.menuId === 'dashboard');

    //         this.productService.getProducts().then(data => this.products = data);

    //         this.cities = [];
    //         this.cities.push({ label: 'Select City', value: null });
    //         this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
    //         this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
    //         this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
    //         this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
    //         this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });

    //         this.chatMessages = [
    //             { from: 'Ioni Bowcher', url: 'assets/demo/images/avatar/ionibowcher.png', messages: ['Hey M. hope you are well.', 'Our idea is accepted by the board. Now it’s time to execute it'] },
    //             { messages: ['We did it! 🤠'] },
    //             { from: 'Ioni Bowcher', url: 'assets/demo/images/avatar/ionibowcher.png', messages: ['That\'s really good!'] },
    //             { messages: ['But it’s important to ship MVP ASAP'] },
    //             { from: 'Ioni Bowcher', url: 'assets/demo/images/avatar/ionibowcher.png', messages: ['I’ll be looking at the process then, just to be sure 🤓'] },
    //             { messages: ['That’s awesome. Thanks!'] }
    //         ];

    //         this.chatEmojis = [
    //             '😀','😃','😄','😁','😆','😅','😂','🤣','😇','😉','😊','🙂','🙃','😋','😌','😍','🥰','😘','😗','😙','😚','🤪','😜','😝','😛',
    //             '🤑','😎','🤓','🧐','🤠','🥳','🤗','🤡','😏','😶','😐','😑','😒','🙄','🤨','🤔','🤫','🤭','🤥','😳','😞','😟','😠','😡','🤬','😔',
    //             '😟','😠','😡','🤬','😔','😕','🙁','😬','🥺','😣','😖','😫','😩','🥱','😤','😮','😱','😨','😰','😯','😦','😧','😢','😥','😪','🤤'
    //         ]

    //         this.ordersChart = {
    //             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
    //             datasets: [{
    //                 label: 'New Orders',
    //                 data: [31, 83, 69, 29, 62, 25, 59, 26, 46],
    //                 borderColor: [
    //                     '#4DD0E1',
    //                 ],
    //                 backgroundColor: [
    //                     'rgba(77, 208, 225, 0.8)',
    //                 ],
    //                 borderWidth: 2,
    //                 fill: true
    //             }, {
    //                 label: 'Completed Orders',
    //                 data: [67, 98, 27, 88, 38, 3, 22, 60, 56],
    //                 borderColor: [
    //                     '#3F51B5',
    //                 ],
    //                 backgroundColor: [
    //                     'rgba(63, 81, 181, 0.8)',
    //                 ],
    //                 borderWidth: 2,
    //                 fill: true,
    //             }]
    //         };

    //         this.ordersOptions = this.getOrdersOptions();

    //         this.overviewChartData1 = {
    //             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
    //             datasets: [
    //                 {
    //                     data: [50, 64, 32, 24, 18, 27, 20, 36, 30],
    //                     borderColor: [
    //                         '#4DD0E1',
    //                     ],
    //                     backgroundColor: [
    //                         'rgba(77, 208, 225, 0.8)',
    //                     ],
    //                     borderWidth: 2,
    //                     fill: true
    //                 }
    //             ]
    //         };

    //         this.overviewChartData2 = {
    //             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
    //             datasets: [
    //                 {
    //                     data: [11, 30, 52, 35, 39, 20, 14, 18, 29],
    //                     borderColor: [
    //                         '#4DD0E1',
    //                     ],
    //                     backgroundColor: [
    //                         'rgba(77, 208, 225, 0.8)',
    //                     ],
    //                     borderWidth: 2,
    //                     fill: true
    //                 }
    //             ]
    //         };

    //         this.overviewChartData3 = {
    //             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
    //             datasets: [
    //                 {
    //                     data: [20, 29, 39, 36, 45, 24, 28, 20, 15],
    //                     borderColor: [
    //                         '#4DD0E1',
    //                     ],
    //                     backgroundColor: [
    //                         'rgba(77, 208, 225, 0.8)',
    //                     ],
    //                     borderWidth: 2,
    //                     fill: true
    //                 }
    //             ]
    //         };

    //         this.overviewChartData4 = {
    //             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
    //             datasets: [
    //                 {
    //                     data: [30, 39, 50, 21, 33, 18, 10, 24, 20],
    //                     borderColor: [
    //                         '#4DD0E1',
    //                     ],
    //                     backgroundColor: [
    //                         'rgba(77, 208, 225, 0.8)',
    //                     ],
    //                     borderWidth: 2,
    //                     fill: true
    //                 }
    //             ]
    //         };

    //         this.overviewChartOptions = {
    //             legend: {
    //                 display: false
    //             },
    //             responsive: true,
    //             scales: {
    //                 yAxes: [{
    //                     display: false
    //                 }],
    //                 xAxes: [{
    //                     display: false
    //                 }]
    //             },
    //             tooltips: {
    //                 enabled: false
    //             },
    //             elements: {
    //                 point: {
    //                     radius: 0
    //                 }
    //             },
    //         };

    //         this.setOverviewColors();

    //         this.appMain['refreshChart'] = () => {
    //             this.ordersOptions = this.getOrdersOptions();
    //             this.setOverviewColors();
    //         };

    //         this.chartData = {
    //             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //             datasets: [
    //                 {
    //                     label: 'Completed',
    //                     data: [65, 59, 80, 81, 56, 55, 40],
    //                     fill: false,
    //                     borderColor: '#4DD0E1'
    //                 },
    //                 {
    //                     label: 'Cancelled',
    //                     data: [28, 48, 40, 19, 86, 27, 90],
    //                     fill: false,
    //                     borderColor: '#212121'
    //                 }
    //             ]
    //         };

    //         this.chartMonthlyData = {
    //             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //             datasets: [
    //                 {
    //                     label: 'My First dataset',
    //                     backgroundColor: '#80DEEA',
    //                     borderColor: 'white',
    //                     data: [65, 59, 80, 81, 56, 55, 40]
    //                 },
    //                 {
    //                     label: 'My Second dataset',
    //                     backgroundColor: '#0097A7',
    //                     borderColor: 'white',
    //                     data: [28, 48, 40, 19, 86, 27, 90]
    //                 }
    //             ]
    //         };

    //         this.timelineEvents = [
    //             { status: 'Ordered', date: '15/10/2020 10:30', icon: "pi pi-shopping-cart", color: '#E91E63', description: "Richard Jones (C8012) has ordered a blue t-shirt for $79." },
    //             { status: 'Processing', date: '15/10/2020 14:00', icon: "pi pi-cog", color: '#FB8C00', description: "Order #99207 has processed succesfully." },
    //             { status: 'Shipped', date: '15/10/2020 16:15', icon: "pi pi-compass", color: '#673AB7', description: "Order #99207 has shipped with shipping code 2222302090." },
    //             { status: 'Delivered', date: '16/10/2020 10:00', icon: "pi pi-check-square", color: '#0097A7', description: "Richard Jones (C8012) has recieved his blue t-shirt." }
    //         ];
    //     }

    //     onEmojiClick(chatInput, emoji) {
    //         if (chatInput) {
    //             chatInput.value += emoji;
    //             chatInput.focus();
    //         }
    //     }

    //     onChatKeydown(event) {
    //         if (event.key === 'Enter') {
    //             let message = event.currentTarget.value;
    //             let lastMessage = this.chatMessages[this.chatMessages.length - 1];

    //             if (lastMessage.from) {
    //                 this.chatMessages.push({ messages: [message] });
    //             }
    //             else {
    //                 lastMessage.messages.push(message);
    //             }

    //             if (message.match(/primeng|primereact|primefaces|primevue/i)) {
    //                 this.chatMessages.push({ from: 'Ioni Bowcher', url: 'assets/demo/images/avatar/ionibowcher.png', messages: ['Always bet on Prime!'] });
    //             }

    //             event.currentTarget.value = '';

    //             const el = this.chatContainerViewChild.nativeElement;
    //             setTimeout(() => {
    //                 el.scroll({
    //                     top: el.scrollHeight,
    //                     behavior: 'smooth'
    //                 });
    //             }, 1);
    //         }
    //     }

    //     setOverviewColors() {
    //         const { pinkBorderColor, pinkBgColor, tealBorderColor, tealBgColor } = this.getOverviewColors();

    //         this.overviewChartData1.datasets[0].borderColor[0] = tealBorderColor;
    //         this.overviewChartData1.datasets[0].backgroundColor[0] = tealBgColor;

    //         this.overviewChartData2.datasets[0].borderColor[0] = tealBorderColor;
    //         this.overviewChartData2.datasets[0].backgroundColor[0] = tealBgColor;

    //         this.overviewChartData3.datasets[0].borderColor[0] = pinkBorderColor;
    //         this.overviewChartData3.datasets[0].backgroundColor[0] = pinkBgColor;

    //         this.overviewChartData4.datasets[0].borderColor[0] = tealBorderColor;
    //         this.overviewChartData4.datasets[0].backgroundColor[0] = tealBgColor;
    //     }

    //     getOverviewColors() {
    //         const isLight = this.app.layoutMode === 'light';
    //         return {
    //             pinkBorderColor: isLight ? '#E91E63' : '#EC407A',
    //             pinkBgColor: isLight ? '#F48FB1' : '#F8BBD0',
    //             tealBorderColor: isLight ? '#009688' : '#26A69A',
    //             tealBgColor: isLight ? '#80CBC4' : '#B2DFDB'
    //         }
    //     }

    //     getOrdersOptions() {
    //         const textColor = getComputedStyle(document.body).getPropertyValue('--text-color') || 'rgba(0, 0, 0, 0.87)';
    //         const gridLinesColor = getComputedStyle(document.body).getPropertyValue('--divider-color') || 'rgba(160, 167, 181, .3)';
    //         const fontFamily = getComputedStyle(document.body).getPropertyValue('--font-family');
    //         return {
    //             legend: {
    //                 display: true,
    //                 labels: {
    //                     fontFamily,
    //                     fontColor: textColor,
    //                 }
    //             },
    //             responsive: true,
    //             scales: {
    //                 yAxes: [{
    //                     ticks: {
    //                         fontFamily,
    //                         fontColor: textColor
    //                     },
    //                     gridLines: {
    //                         color: gridLinesColor
    //                     }
    //                 }],
    //                 xAxes: [{
    //                     ticks: {
    //                         fontFamily,
    //                         fontColor: textColor
    //                     },
    //                     gridLines: {
    //                         color: gridLinesColor
    //                     }
    //                 }]
    //             }
    //         }
    //     }
    // }






    overviewChartOptions: any;
    overviewChartData1: any;
    overviewChartData2: any;
    overviewChartData3: any;
    overviewChartData4: any;
    salesChartData: any;
    incomeExpenseProfitChartData: any;
    barChartOptions: any;
    ordersChart: any;
    ordersOptions: any;
    monthOptions: any[];
    selectedMonth: string;
    timelineEvents: any[];
    accountGroupBalanceChartData: any;
    activityList = [
        { title: 'Income', date: '30 November, 16.20', value: 80, status: 'Approved' },
        { title: 'Tax', date: '1 December, 15.27', value: 15, status: 'Pending' },
        { title: 'Invoices', date: '1 December, 15.28', value: 60, status: 'Approved' },
        { title: 'Expenses', date: '3 December, 09.15', value: 40, status: 'Pending' },
        { title: 'Bonus', date: '1 December, 23.55', value: 95, status: 'Approved' },
        { title: 'Revenue', date: '30 November, 16.20', value: 54, status: 'Pending' }
    ];

    lineChartData: any;
    lineChartOptions: any;
    doughnutChartData: any;
    doughnutChartOptions: any;
    chartMonthlyData: any;
    chartMonthlyOptions: any;
    isStacked = false;
    storesOverview: any[] = [];

    daysReceivableChart: any;
    daysReceivableOptions: any;

    receivableAgingChart: any;
    receivableAgingOptions: any;

    daysInventoryChart: any;
    daysInventoryOptions: any;

    inventoryTrendChart: any;
    inventoryTrendOptions: any;
    


    constructor() { }

    ngOnInit(): void {
        this.initializeChartData();
        this.initializeMenuOptions();
        this.initializeTimelineEvents();
        this.initializeMonthlyChart();
        this.initializeDoughnutChart();
        this.initializeStoresOverview();
        this.initializeTrendCharts()

    }

    initializeTrendCharts() {
        // Gauge-style Doughnut for Days Receivable Outstanding
        this.daysReceivableChart = {
          labels: ['Completed', 'Remaining'],
          datasets: [{
            data: [93, 87], // 180 - 93 = 87
            backgroundColor: ['#3366CC', '#e0e0e0'],
            hoverBackgroundColor: ['#3366CC', '#e0e0e0'],
            borderWidth: 0
          }]
        };
    
        this.daysReceivableOptions = {
          circumference: Math.PI,
          rotation: Math.PI,
          cutoutPercentage: 70,
          plugins: {
            legend: { display: false }
          }
        };
    
        // Bar Chart for Receivable Aging
        this.receivableAgingChart = {
          labels: ['<30 Days', '30-60 Days', '60-90 Days', '>90 Days'],
          datasets: [{
            label: 'Receivables',
            data: [300, 400, 250, 175],
            backgroundColor: '#FFB300'
          }]
        };
    
        this.receivableAgingOptions = {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          legend: {
            display: false
          }
        };
    
        // Gauge-style Doughnut for Days Inventory Outstanding
        this.daysInventoryChart = {
          labels: ['Completed', 'Remaining'],
          datasets: [{
            data: [64, 116], // 180 - 64 = 116
            backgroundColor: ['#00796B', '#e0e0e0'],
            hoverBackgroundColor: ['#00796B', '#e0e0e0'],
            borderWidth: 0
          }]
        };
    
        this.daysInventoryOptions = {
          circumference: Math.PI,
          rotation: Math.PI,
          cutoutPercentage: 70,
          plugins: {
            legend: { display: false }
          }
        };
    
        // Line Chart for Inventory Trend
        this.inventoryTrendChart = {
          labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          datasets: [{
            label: 'Inventory',
            data: [6000, 8000, 7500, 9000, 9500, 12000, 11000, 10500, 10000, 12500, 11500, 14000],
            fill: false,
            borderColor: '#0288D1',
            tension: 0.4
          }]
        };
    
        this.inventoryTrendOptions = {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                max: 15000
              }
            }]
          }
        };
      }
    


    initializeChartData() {
        this.overviewChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            legend: { display: false },
            scales: {
                xAxes: [{ display: false }],
                yAxes: [{ display: false }]
            }
        };

        this.overviewChartData1 = this.getSampleChartData();
        this.overviewChartData2 = this.getSampleChartData();
        this.overviewChartData3 = this.getSampleChartData();
        this.overviewChartData4 = this.getSampleChartData();

        this.barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false,
                        maxRotation: 0,
                        minRotation: 0
                    }
                }],
                yAxes: [{
                    beginAtZero: true
                }]
            }
        };

        this.salesChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                { label: 'Sales', data: [120, 150, 180, 130, 170, 200, 250, 220, 190, 210, 230, 240], backgroundColor: '#42A5F5' }
            ],
            options: this.barChartOptions
        };

        this.incomeExpenseProfitChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                { label: 'Income', data: [200, 250, 300, 270, 290, 310, 350, 320, 300, 310, 330, 340], backgroundColor: '#42A5F5' },
                { label: 'Expenses', data: [150, 180, 220, 200, 210, 230, 260, 240, 220, 230, 250, 260], backgroundColor: '#FFA726' },
                { label: 'Profit', data: [50, 70, 80, 70, 80, 90, 100, 80, 80, 80, 80, 80], backgroundColor: '#66BB6A' }
            ],
            options: this.barChartOptions
        };

        this.accountGroupBalanceChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                { label: 'Balance', data: [500, 700, 800, 650, 720, 900, 1100, 980, 850, 920, 1050, 1150], backgroundColor: '#AB47BC' }
            ],
            options: this.barChartOptions
        };

        this.lineChartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Sales',
                    data: [150, 200, 180, 220, 250, 300],
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: 0.4
                },
                {
                    label: 'Purchases',
                    data: [100, 120, 130, 140, 160, 180],
                    fill: false,
                    borderColor: '#FFA726',
                    tension: 0.4
                }
            ]
        };

        this.lineChartOptions = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        this.ordersChart = this.getSampleChartData();
        this.ordersOptions = this.overviewChartOptions;
    }

    initializeMonthlyChart() {
        this.chartMonthlyData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: '2018',
                    backgroundColor: '#42A5F5',
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
                {
                    label: '2019',
                    backgroundColor: '#66BB6A',
                    data: [28, 48, 40, 19, 86, 27, 90],
                },
                {
                    label: '2020',
                    backgroundColor: '#FFA726',
                    data: [35, 25, 60, 90, 70, 40, 80],
                },
            ],
        };

        this.chartMonthlyOptions = {
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            responsive: true,
            scales: {
                x: {
                    stacked: this.isStacked,
                },
                y: {
                    stacked: this.isStacked,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 20,
                    },
                },
            },
        };
    }

    initializeDoughnutChart() {
        this.doughnutChartData = {
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [
                {
                    data: [12, 20, 18, 25, 30, 95, 6],
                    backgroundColor: [
                        '#4FC3F7',
                        '#81C784',
                        '#00ACC1',
                        '#26C6DA',
                        '#AB47BC',
                        '#66BB6A',
                        '#FFA726',
                    ],
                    hoverBackgroundColor: [
                        '#29B6F6',
                        '#66BB6A',
                        '#0097A7',
                        '#00BCD4',
                        '#9C27B0',
                        '#43A047',
                        '#FB8C00',
                    ],
                },
            ],
        };

        this.doughnutChartOptions = {
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            cutout: '70%',
            responsive: true,
        };
    }

    changeMonthlyDataView() {
        this.isStacked = !this.isStacked;
        this.initializeMonthlyChart();
    }

    changeDoughnutDataView() {
        this.doughnutChartData.datasets[0].data = this.doughnutChartData.datasets[0].data.map(() => Math.floor(Math.random() * 100));
    }

    initializeMenuOptions() {
        this.monthOptions = [
            { label: 'January', value: 'January' },
            { label: 'February', value: 'February' },
            { label: 'March', value: 'March' },
            { label: 'April', value: 'April' },
            { label: 'May', value: 'May' },
            { label: 'June', value: 'June' },
            { label: 'July', value: 'July' },
            { label: 'August', value: 'August' },
            { label: 'September', value: 'September' },
            { label: 'October', value: 'October' },
            { label: 'November', value: 'November' },
            { label: 'December', value: 'December' }
        ];
        this.selectedMonth = 'January';
    }

    initializeTimelineEvents() {
        this.timelineEvents = [
            { status: 'Ordered', date: '15 Feb 2025', icon: 'pi pi-shopping-cart', color: '#4CAF50', description: 'Order placed successfully.' },
            { status: 'Processed', date: '16 Feb 2025', icon: 'pi pi-cog', color: '#FFC107', description: 'Order is being processed.' },
            { status: 'Shipped', date: '17 Feb 2025', icon: 'pi pi-truck', color: '#2196F3', description: 'Order has been shipped.' },
            { status: 'Delivered', date: '18 Feb 2025', icon: 'pi pi-check', color: '#8BC34A', description: 'Order delivered successfully.' }
        ];
    }

    initializeStoresOverview() {
        this.storesOverview = [
            {
                name: 'Store A Sales',
                amount: 332.99,
                change: -2.23,
                chart: this.getSampleChartData()
            },
            {
                name: 'Store B Sales',
                amount: 436.78,
                change: 380.06,
                chart: this.getSampleChartData()
            },
            {
                name: 'Store C Sales',
                amount: 569.59,
                change: 357.10,
                chart: this.getSampleChartData()
            },
            {
                name: 'Store D Sales',
                amount: 205.13,
                change: -57.28,
                chart: this.getSampleChartData()
            }
        ];
    }


    getSampleChartData() {
        return {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [
                {
                    label: 'Sales',
                    data: [30, 50, 80, 40, 100],
                    borderColor: '#42A5F5',
                    fill: false
                }
            ]
        };
    }

}