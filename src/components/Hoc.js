class LectureCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hovering: false
        }
    }

    onMouseOver = () => this.setState({hovering: true});
    onMouseOut = () => this.setState({hovering: false});

    render () {
        return (
            <div 
            onMouseOver = {this.onMouseOver}
            onMouseOut = {this.onMouseOut}>
                
                this.state.hovering === true ? <Tooltip /> : null
            </div>
        );
    }
}
// Above logic can be reused with different components with the help og hoc's which resembles higher order component.

function withHover(Component) {

    class WithHover extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                hovering: false
            }
        }

        onMouseOver = () => this.setState({hovering: true});
        onMouseOut = () => this.setState({hovering: false});
    
        render() {
            return (
                <div
                onMouseOut = {this.onMouseOut}
                onMouseOver = {this.onMouseOver}
                >
                    <Component hovering = {this.state.hovering} />
                </div>
            );
        }
    }

    return <WithHover />
}


class LectureCard extends React.Component {
    render () {
        return (
                this.props.hovering === true ? <Tooltip /> : null
        );
    }
}

const lectureCardWithHovering = withHover(<LectureCard />);


