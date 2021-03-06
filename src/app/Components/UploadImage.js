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
      reset: props.imagePreviewUrl ? false : true,
      resetPreviews: null,
      ready: false
    };
  }

  _handleImageChange(e) {
    e.preventDefault();
    let reader = this.props.reader;
    let file = e.target.files[0];

    reader.onloadend = () => {
      if (this.props.getScreenshotSrc) {
        this.props.getScreenshotSrc(reader.result);
      }

      let URL = window.URL || window.webkitURL;
      let urlSrc = URL.createObjectURL(file);

      this.setState({
        file: file,
        imagePreviewUrl: urlSrc
      });
    }

    reader.readAsDataURL(file);
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

    if (this.props.imagePreviewUrl) {
      this.props.onUploadComplete();
    }
  }

  componentDidMount() {
    // setTimeout because clicking on yes overlapped with clicking on taking picture
    setTimeout(() => {
      this.setState({
        ready: true
      });
    }, 250);
  }

  render() {
    const isMobile = window.innerWidth <= 1025;
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    let hide = this.state.reset || !(this.props.imagePreviewUrl) ? '' : 'hide';

    let {imagePreviewUrl} = this.state;

    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<div className={'img-preview text-center'}><div className="preview-text"><img src={imagePreviewUrl} /></div></div> );
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

    if (isMobile) {
      return (
        <div className="webcam-container" key={this.id}>
          <label htmlFor={this.id} className="custom-file-upload">
            Take picture
          </label>
          <input type="file"
                 accept="image/*"
                 id={this.id}
                 capture="camera"
                 disabled={!this.state.ready}
                 onChange={(e) => this._handleImageChange(e)} />
          <div className={this.state.file ? 'img-preview text-center' : ''}>
            {$imagePreview}
          </div>
        </div>
      )
    }

    // if (isMobile && !iOS) {
    //   return (
    //     <div className="webcam-container" key={this.id}>
    //       <div className={`webcam-component ${hide}`}>
    //         <Webcam audio={false}
    //                 onUserMedia={() => this.onCapture}
    //                 ref={this.setRef}
    //                 screenshotFormat="image/jpeg" />
    //       </div>

    //       <div className={this.state.file ? 'img-preview text-center' : 'hide'}>
    //         {$imagePreview}
    //       </div>

    //       {!this.state.reset && (
    //         <div className="webcam-preview">
    //           <img src={this.state.mobileImagePreviewUrl || this.props.imagePreviewUrl} alt="Preview"/>
    //         </div>
    //       )}

    //       <RaisedButton label="Retake"
    //                     className="retake-btn"
    //                     labelStyle={{fontSize: '18px'}}
    //                     style={{height: '48px'}}
    //                     onClick={() => this.onReset()}
    //                     primary={true} />

    //       <button style={{marginTop: '10px'}} onClick={() => this.capture()} disabled={!this.state.reset}>
    //         <i className="material-icons">photo_camera</i>
    //       </button>
    //     </div>
    //   )
    // }
  }
}

export default UploadImage;