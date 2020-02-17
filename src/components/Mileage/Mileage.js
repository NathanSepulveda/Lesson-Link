import StudentAndParentManager from "../../modules/StudentAndParentManager"
import React, { Component } from "react"


import * as Chart from "chart.js"
import MileageModal from "./MileageModal"






class Mileage extends Component {
    state = {
        miles: [],
        janTotal: 0,
        febTotal: 0,
        marchTotal: 0,
        aprilTotal: 0,
        mayTotal: 0,
        juneTotal: 0,
        julyTotal: 0,
        augTotal: 0,
        sepTotal: 0,
        octTotal: 0,
        novTotal: 0,
        decTotal: 0,
        yearlyTotal: 0,
        cashPercentage: 0,
        cashAmount: 0,
        checkPercentage: 0,
        checkAmount: 0,
        electronicpaymentPercentage: 0,
        electronicPaymentAmount: 0

    }

    filterMiles = () => {
        let newState = {}
        console.log(this.state.miles)
        let jan = this.state.miles.filter(p => new Date(p.date).getMonth() === 0)


                let janTotal = jan.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )
                newState.janTotal = janTotal
                
                let feb = this.state.miles.filter(p => new Date(p.date).getMonth() === 1)

                let febTotal = feb.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )
                newState.febTotal = febTotal
                this.setState({febTotal : febTotal})

                let march = this.state.miles.filter(p => new Date(p.date).getMonth() === 2)


                let marchTotal = march.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.marchTotal = marchTotal

                let april = this.state.miles.filter(p => new Date(p.date).getMonth() === 3)


                let aprilTotal = april.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.aprilTotal = aprilTotal

                let may = this.state.miles.filter(p => new Date(p.date).getMonth() === 4)


                let mayTotal = may.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.mayTotal = mayTotal

                let june = this.state.miles.filter(p => new Date(p.date).getMonth() === 5)


                let juneTotal = june.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.juneTotal = juneTotal


                let july = this.state.miles.filter(p => new Date(p.date).getMonth() === 6)


                let julyTotal = july.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.julyTotal = julyTotal


                let aug = this.state.miles.filter(p => new Date(p.date).getMonth() === 7)


                let augTotal = aug.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.augTotal = augTotal


                let sep = this.state.miles.filter(p => new Date(p.date).getMonth() === 8)


                let sepTotal = sep.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.sepTotal = sepTotal


                let oct = this.state.miles.filter(p => new Date(p.date).getMonth() === 9)



                let octTotal = oct.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.octTotal = octTotal

                let nov = this.state.miles.filter(p => new Date(p.date).getMonth() === 10)



                let novTotal = nov.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.novTotal = novTotal

                let dec = this.state.miles.filter(p => new Date(p.date).getMonth() === 11)



                let decTotal = dec.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.decTotal = decTotal



                let total = this.state.miles.reduce((currentTotal, nextValue) => {
                    return currentTotal += Number(nextValue.amount)


                }, 0
                )
                newState.yearlyTotal = total
                this.setState(newState)

    }


    componentDidMount() {
        let newState = {}
        StudentAndParentManager.getMiles()
            .then(miles => {
                newState.miles = miles
                return miles
            }).then()
            .then(() =>
                this.setState(newState))
            .then(() => {

                let jan = this.state.miles.filter(p => new Date(p.date).getMonth() === 0)


                let janTotal = jan.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )
                newState.janTotal = janTotal
                
                let feb = this.state.miles.filter(p => new Date(p.date).getMonth() === 1)

                let febTotal = feb.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )
                newState.febTotal = febTotal

                let march = this.state.miles.filter(p => new Date(p.date).getMonth() === 2)


                let marchTotal = march.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.marchTotal = marchTotal

                let april = this.state.miles.filter(p => new Date(p.date).getMonth() === 3)


                let aprilTotal = april.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.aprilTotal = aprilTotal

                let may = this.state.miles.filter(p => new Date(p.date).getMonth() === 4)


                let mayTotal = may.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.mayTotal = mayTotal

                let june = this.state.miles.filter(p => new Date(p.date).getMonth() === 5)


                let juneTotal = june.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.juneTotal = juneTotal


                let july = this.state.miles.filter(p => new Date(p.date).getMonth() === 6)


                let julyTotal = july.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.julyTotal = julyTotal


                let aug = this.state.miles.filter(p => new Date(p.date).getMonth() === 7)


                let augTotal = aug.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.augTotal = augTotal


                let sep = this.state.miles.filter(p => new Date(p.date).getMonth() === 8)


                let sepTotal = sep.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.sepTotal = sepTotal


                let oct = this.state.miles.filter(p => new Date(p.date).getMonth() === 9)



                let octTotal = oct.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.octTotal = octTotal

                let nov = this.state.miles.filter(p => new Date(p.date).getMonth() === 10)



                let novTotal = nov.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.novTotal = novTotal

                let dec = this.state.miles.filter(p => new Date(p.date).getMonth() === 11)



                let decTotal = dec.reduce((currentTotal, nextValue) => {

                    return currentTotal += Number(nextValue.amount)


                }, 0
                )

                newState.decTotal = decTotal



                let total = this.state.miles.reduce((currentTotal, nextValue) => {
                    return currentTotal += Number(nextValue.amount)


                }, 0
                )
                newState.yearlyTotal = total

                console.log(this.state)

                this.setState(newState)
                

                this.paymentChart()

            })





    }
    paymentChart = () => {

        new Chart(document.getElementById("myChart"), {
            "type": "bar", "data": {
                "labels": ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
                "datasets": [{
                    "label": "Monthly Miles", "data": [this.state.janTotal, this.state.febTotal, this.state.marchTotal, this.state.aprilTotal,
                    this.state.mayTotal, this.state.juneTotal, this.state.julyTotal, this.state.augTotal, this.state.sepTotal,
                    this.state.octTotal, this.state.novTotal, this.state.decTotal],
                    "fill": false, "backgroundColor": ["rgba(25, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"],
                    "borderColor": ["rgb(25, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(101, 203, 207)", "rgb(14, 12, 235)"],

                    "borderWidth": 5
                }]
            }, "options": { "scales": { "yAxes": [{ "ticks": { "beginAtZero": true } }] } }
        });
    }

    addPayment = (milesObj) => {
        return StudentAndParentManager.addMiles(milesObj)
            .then(() => StudentAndParentManager.getMiles())
            .then(miles => {this.setState({ miles: miles,
                collapse: !this.state.collapse})}
                ).then(() => {
                    this.filterMiles()
                    this.paymentChart()
                }
                
                )
    }

    render() {

        
          let totals =   this.state.miles.reduce((currentTotal, nextValue) => {
                return currentTotal += Number(nextValue.amount)


            }, 0
            ) || 0
        return (
            <React.Fragment>
                <div className="page-component-wrapper row d-flex milesummary justify-content-center">
                    <div className="page-component teacherhome col-md-10">
                        <h1>Monthly Miles</h1>
                        <canvas id="myChart" width="200" height="50"></canvas>
                        <br></br>




                        
                            <h1> 2020 Starting Miles: 32,800 </h1>
                            <h1>Total Business Miles: {totals} </h1>
                            <h1>Mileage Expenses: ${(totals * .575).toFixed(2)}</h1>
                            
                        

                    </div>
                    <br></br>
                    <div>
                            <MileageModal

                                {...this.props}
                                addMiles={this.addPayment}

                            />
                        </div>
                </div>
            </React.Fragment>
        )
    }

}


export default Mileage