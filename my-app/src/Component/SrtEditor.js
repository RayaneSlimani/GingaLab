import React, { Component } from 'react'
import $ from 'jquery'
import { saveAs } from 'file-saver/FileSaver';
export class SrtEditor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fileContent: []
    }
    this.fileReader = {};
  }
  
  fileRead = (e) => {
    const string = this.fileReader.result;

    const lines = string.split('\n');
    let output = [];
    let buffer = { content: '' };

    lines.forEach((line) => {
      if (!buffer.id) {
        buffer.id = line;
      } 
      else if (!buffer.start) {
          let time = line.split(' --> ');
          buffer.start = time[0];
          buffer.end = time[1];
      } 
      else if (line !== '') {
        buffer.content = line;
      } 
      else {
        output.push(buffer);
        buffer = { content: '' };
      }
    });
    this.setState({
      fileContent: output
    });
  }

  handleFile = (file) => {
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.fileRead;
    this.fileReader.readAsText(file);
  }

  createSrt = () => {
    let inputs = $('[name=toSave]');
    let content = '';
    for (let input in inputs) {
      let inputVal = inputs[input].value;
      if (inputVal && typeof inputs[input] === 'object') {
        let inputType = inputs[input].getAttribute('data-type');
        if (inputType === "content") {
          content += inputVal + ("\n\n");
        } else if (inputType === 'start') {
          content += inputVal + (" --> ");
        } else {
          content += inputVal + ("\n");
        }
      }
    }
    return content;
  }

  filesave = () => {
    let content = this.createSrt();
    var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "subtitle.srt");
  }

  

  render() {
    
    console.log('fileContent ',this.state.fileContent);

    return (
      <div className="form-group container">
      <br/>
      <div className="container-fluid">
      <div className="btn-group" role="group" aria-label="Basic example">
      <button id="btn-save" type="submit" className="btn btn-dark" onClick={this.filesave}>Save to SRT</button>
      <button className="btn btn-light"><input className="btn btn-light " type="file" onChange={e => this.handleFile(e.target.files[0])}/></button>
      </div>
      { (this.state.fileContent.length > 0) ?
            this.state.fileContent.map((elem, index) => 
            <form key={index}>
            <br/>
            <div className="form-control">
            <div className="form-group">
              <label className="mr-sm-2">Line : </label>
                <input className="form-control" id="id-line" type="number" defaultValue={elem.id} name="toSave" data-type="line"/>

              <label className="mr-sm-2" >Start : </label>
                <input className="form-control" id="start" type="text" defaultValue={elem.start} name="toSave" data-type="start"/>

              <label className="mr-sm-2">End : </label>
                <input className="form-control"   id="end" type="text" defaultValue={elem.end} name="toSave" data-type="end"/>
              </div>
            <div className="form-group">
              <label htmlFor="content">Content : </label>
                <textarea className="form-control" id ="content" type="text" defaultValue={elem.content} name="toSave" data-type="content"/>
            </div>
            </div>
            </form>)
          : ''
        }
        </div>
      </div>
    )
  }
}

export default SrtEditor


