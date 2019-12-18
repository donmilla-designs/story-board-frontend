import React from 'react'
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'
import { delete_story } from '../redux/actions'


class StoryDetail extends React.Component{

    story = this.props.currentStory
    currentId = this.story.id

    delete = async () => {
        this.props.delete_story(this.currentId)
        await fetch(`http://localhost:3000/stories/${this.story.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        console.log("deleted!")
    } 

    storyPlots = () => {
        if(this.story.plots){
            return <ul>
                {this.story.plots.map(plot => {
                return <li style={{listStyle: "none"}}>
                    <h5>{plot.name}</h5>
                    <p>{plot.summary}</p>
                </li>})}
            </ul>
            } else {
            return "You haven't added any plot arcs for this story yet"}
    }

    storyCharacters = () => {
        if(this.story.characters){
            return <ul>
                {this.story.characters.map(character => {
                return <li style={{listStyle: "none"}}>
                    <h5>{character.name}</h5>
                    <p>{character.description}</p>
                </li>})}
            </ul>
            } else {
            return "You haven't added any characters for this story yet"}
    }
    
    render(){
        return(
        <div style={{textAlign: "center", marginTop: "10%"}}>
            <h2>{this.story.title}</h2>
            <NavLink to="/stories/edit">✎</NavLink>
            <p>{this.story.summary}</p>
            
                <h4>Plot Arcs:</h4>
                    {this.storyPlots()}
            
            <h3>Characters:</h3>
                {this.storyCharacters()} 
            <NavLink to='/stories' onClick={this.delete}>DELETE STORY</NavLink>

        </div>
    )}
}
const mapStateToProps = (state) => {
    return {
      stories: state.stories,
      currentStory: state.currentStory
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        delete_story: currentId => {
            dispatch(delete_story(currentId))
        }
    }
}

  export default connect(mapStateToProps, mapDispatchToProps)(StoryDetail)

