import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
  
  onChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value 
      } 
    })
  }

  onFindPetsClick = (event) => {
    let url = "/api/pets" 
    
    url = this.state.filters.type === "all" ? url : `${url}?type=${this.state.filters.type}`

    fetch(url)
    .then(resp => resp.json())
    .then(petsData => this.setState({
      pets: petsData
    }))
  }
  
  onAdoptPet = (id) => {
    let updatedPetsData = this.state.pets.map(pet => {
      if (pet.id === id) {
        pet.isAdopted = true 
        //{...pet, isAdopted: true}
      }
      return pet 
    })
    debugger 
    this.setState({
      pets: updatedPetsData
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
