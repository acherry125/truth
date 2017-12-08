import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

/*** Create a Routing Input, similar to <Link>, but with <input/> instead of the built-in <a> ***/
class InputLink extends Component {
    /** Props
    *  this.props.route
    *  this.props.name
    *  this.props.id
    *  this.props.type
    *  this.props.className
    *  this.props.placeholder
    *  this.props.value
    *  this.props.listenerType :: onClick, onChange, onSubmit etc
    *  this.props.additionalOnChange() :: function to happen on listener firing besides route change
    **/
    constructor(props) {
        super(props);
        this.onEventFiring = this.onEventFiring.bind(this);
    }
    /** Methods **/
    onEventFiring(event) {
        this.props.additionalOnChange ? this.props.additionalOnChange(event.target.value) : null;
        if (event.target.type === 'radio' || event.target.type === 'check') {
            event.target.checked = false;
        }
        // props.history is passed by the last line in this file; withRouter is a higher order component that wraps this component with some routing props
        this.props.history.push(this.props.route)
    }
    render() {
        // We're basically just wrapping the input so it always changes the url (the React Router way)
        const name = this.props.name,
            id = this.props.id,
            type = this.props.type,
            cssClass = this.props.className,
            value = this.props.value,
            listenerType = this.props.listenerType;
        // TODO look into the spread operator to be able to make this dynamic without the if
        if (listenerType === 'onClick') {
            return <input onClick={this.onEventFiring} className={this.props.className} name={name} id={id} type={type} className={cssClass} value={value}/>            
        } else if (listenerType === 'onChange') {
            return <input onChange={this.onEventFiring} defaultChecked={false} placeholder={this.props.placeholder} className={this.props.className} name={name} id={id} type={type} className={cssClass} value={value}/>                        
        }      
    }
}

export default InputLink = withRouter(InputLink);
