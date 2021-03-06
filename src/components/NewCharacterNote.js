import React from 'react'
import { connect } from 'react-redux'
import { set_character_note, update_character } from '../redux/actions'
import { Redirect } from 'react-router'

class NewCharacterNote extends React.Component {

    state = {
        text: "",
        redirectBoolean: false,
        errors: []
    }

    newCharacterNoteSubmitted = async (event) => {
        event.preventDefault()
        let rawCharacterNote = await fetch ('http://localhost:3000/character_notes', 
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.token
            },
            body: JSON.stringify({character_note: {
                character_id: this.props.currentCharacter.id,
                text: this.state.text
            }})
          })
          let characterNote = await rawCharacterNote.json()
          if (characterNote.errors) {
            this.setState({
              errors: characterNote.errors
            })
          } else {
        console.log(characterNote)
        this.props.set_character_note(characterNote)
        this.props.update_character(this.props.currentCharacter)
        this.setState({
          redirectBoolean: true
        })
        console.log(this.state)
          }
    }

    onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      renderOrRedirect = () => {
        if(this.state.redirectBoolean === true){
          console.log(this.state)
           return <Redirect to={`/stories/${this.props.currentCharacter.story_id}`} />} 
           else {
             console.log(this.state)
           return <section style={{textAlign: "center"}}>
              <h2 >NEW CHARACTER NOTE</h2>
              <br></br>
              <form onSubmit={ this.newCharacterNoteSubmitted }>
                  <br></br>
                  <label  htmlFor="new_character_note">NOTE</label>
                  <br></br>
                  <textarea  
                      style={{width: "80%", height: "300px"}}
                      id="new_character_note" 
                      onChange={ this.onChange } 
                      name="text" 
                      value={ this.state.text } />
                      <br></br><br></br>
                  <input type="submit" />
              </form>
              </section>}
      }

    render(){
        return(
          <>
         {this.renderOrRedirect()}
         </>
        )}
}

const mapStateToProps = (state) => {
    return {
      currentCharacter: state.currentCharacter
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        set_character_note: (character_note) => {
            dispatch(set_character_note(character_note))
        },
        update_character: (currentCharacter) => {
            dispatch(update_character(currentCharacter))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCharacterNote)
