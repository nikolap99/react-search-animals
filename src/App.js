import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    animalConst = [];
    check = false;
    promise = fetch(
        "https://raw.githubusercontent.com/boennemann/animals/master/words.json"
    )
        .then(blob => blob.json())
        .then(data => {
            this.check = true;
            this.animalConst.push(...data);
        });

    state = {
        /*animals: this.animalConst*/
        animals: []
    };
    componentDidMount() {
        this.setState({
            animals: ["Loading..."]
        });
        const stateUpdate = () => {
            this.setState({
                animals: this.animalConst
            });
        };
        setTimeout(stateUpdate, 500);
    }
    handleChange = e => {
        const newAnimals = this.animalConst.filter(animal =>
            animal.includes(e.target.value)
        );
        this.setState({
            animals: newAnimals
        });
    };
    goToWiki = e => {
        window.open(
            "https://en.wikipedia.org/wiki/" + e.target.innerHTML,
            "_blank"
        );
    };
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">React Animal Search</h1>
                </header>
                <div className="input-container">
                    <input
                        className="search-input"
                        placeholder="Type the species of Animals"
                        onChange={this.handleChange}
                    />
                    <div className="animals">
                        {this.state.animals.map(animal => (
                            <div key={animal}>
                                <span onClick={this.goToWiki}>{animal}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
