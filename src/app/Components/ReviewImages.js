import React from 'react';
import FlatButton from 'material-ui/FlatButton';

class ReviewImages extends React.Component {
  render () {
    return (
      <div>
        <h3 className="spacer-small">{this.props.title}</h3>
        <div className="review-imgs">
          {
            this.props.data['Primary Insurance Front'] && (
              <div className="review-img">
                <h4>Primary Insurance</h4>
                <FlatButton label="Edit"
                            labelStyle={{fontSize: '18px'}}
                            style={{height: '48px'}}
                            onTouchTap={() => this.props.handleEdit(this.props.step)} />
                <div className="img-preview">
                  <img src={this.props.data['Primary Insurance Front']} alt="Insurance image"/>
                </div>
                <div className="img-preview">
                  <img src={this.props.data['Primary Insurance Back']} alt="Insurance image"/>
                </div>
              </div>
            )
          }

          {
            this.props.data['Secondary Insurance Front'] && (
              <div className="review-img">
                <div className="spacer-small"></div>
                <h4>Secondary Insurance</h4>
                <FlatButton label="Edit"
                            labelStyle={{fontSize: '18px'}}
                            style={{height: '48px'}}
                            onTouchTap={() => this.props.handleEdit(this.props.step)} />
                <div className="img-preview">
                  <img src={this.props.data['Secondary Insurance Front']} alt="Insurance image"/>
                </div>
                <div className="img-preview">
                  <img src={this.props.data['Secondary Insurance Back']} alt="Insurance image"/>
                </div>
              </div>
            )
          }

          {
            this.props.data['Prescription'] && (
              <div className="review-img">
                <FlatButton label="Edit"
                            labelStyle={{fontSize: '18px'}}
                            style={{height: '48px'}}
                            onTouchTap={() => this.props.handleEdit(this.props.step)} />
                <div className="img-preview">
                  <img src={this.props.data['Prescription']} alt="Prescription image"/>
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default ReviewImages;
