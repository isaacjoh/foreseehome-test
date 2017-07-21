import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import newId from '../utils/NewId';
import Webcam from 'react-webcam';

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: props.imagePreviewUrl || '',
      mobileImagePreviewUrl: null,
      reset: true,
      resetPreviews: null
    };

    if (props.imagePreviewUrl) {
      this.props.getScreenshotSrc(imagePreviewUrl);
    }
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      if (this.props.getScreenshotSrc) {
        this.props.getScreenshotSrc(reader.result);
      }

      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();

    this.setState({
      reset: false,
      mobileImagePreviewUrl: imageSrc
    });

    if (this.props.getScreenshotSrc) {
      this.props.getScreenshotSrc(imageSrc);
    }
  };

  onCapture = () => {

  }

  onReset = () => {
    this.setState({
      reset: true,
      mobileImagePreviewUrl: null,
      imagePreviewUrl: null
    });
    this.props.getScreenshotSrc(null);
  }

  componentWillUpdate(nextProps, nextState) {
    let resetPreviews = this.state.resetPreviews || nextProps.resetPreviews;

    if (resetPreviews !== 'completed' && resetPreviews) {
      this.setState({
        resetPreviews: 'completed'
      });

      this.onReset();
    }
  }

  componentWillMount() {
    this.id = newId();
  }

  render() {
    const isMobile = window.innerWidth <= 1025;
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    let hide = this.state.reset ? '' : 'hide';

    let {imagePreviewUrl} = this.state;

    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<div className="preview-text"><img src={imagePreviewUrl} /></div> );
    } else {
      $imagePreview = (<div className="preview-text"></div>);
    }

    if (!isMobile) {
      return (
        <div className="preview-component">
          <label htmlFor={this.id} className="custom-file-upload">
            Choose File
          </label>
          <input id={this.id}
                 type="file"
                 onChange={(e) => this._handleImageChange(e)} />
          <div className={this.state.file ? 'img-preview text-center' : ''}>
            {$imagePreview}
          </div>
        </div>
      )
    }

    if (isMobile && iOS) {
      return (
        <div className="webcam-container" key={this.id}>
          <label htmlFor={this.id} className="custom-file-upload">
            Take picture
          </label>
          <input type="file" accept="image/*" id={this.id} capture="camera" onChange={(e) => this._handleImageChange(e)} />

          <div className={this.state.file ? 'img-preview text-center' : ''}>
            {$imagePreview}
          </div>
        </div>
      )
    }

    if (isMobile && !iOS) {
      return (
        <div className="webcam-container" key={this.id}>
          <div className={`webcam-component ${hide}`}>
            <Webcam audio={false}
                    onUserMedia={() => this.onCapture}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg" />
          </div>

          <div className={this.state.file ? 'img-preview text-center' : ''}>
            {$imagePreview}
          </div>

          {!this.state.reset && (
            <div className="webcam-preview">
              <img src={this.state.mobileImagePreviewUrl} alt="Preview"/>
            </div>
          )}

          <RaisedButton label="Retake"
                        className="retake-btn"
                        onClick={this.onReset}
                        primary={true} />

          <button onClick={this.capture}>
            <i className="material-icons">photo_camera</i>
          </button>
        </div>
      )
    }
  }
}

export default UploadImage;