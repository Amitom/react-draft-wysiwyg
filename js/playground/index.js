/* @flow */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import draftToHtml from 'draftjs-to-html'; // eslint-disable-line import/no-extraneous-dependencies
import draftToMarkdown from 'draftjs-to-markdown'; // eslint-disable-line import/no-extraneous-dependencies
import {
  convertFromHTML,
  convertToRaw,
  ContentState,
} from 'draft-js';
import { Editor } from '../src';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

const contentBlocks = convertFromHTML('<p>Lorem ipsum ' +
      'dolor sit amet, consectetur adipiscing elit. Mauris tortor felis, volutpat sit amet ' +
      'maximus nec, tempus auctor diam. Nunc odio elit,  ' +
      'commodo quis dolor in, sagittis scelerisque nibh. ' +
      'Suspendisse consequat, sapien sit amet pulvinar  ' +
      'tristique, augue ante dapibus nulla, eget gravida ' +
      'turpis est sit amet nulla. Vestibulum lacinia mollis  ' +
      'accumsan. Vivamus porta cursus libero vitae mattis. ' +
      'In gravida bibendum orci, id faucibus felis molestie ac.  ' +
      'Etiam vel elit cursus, scelerisque dui quis, auctor risus.</p>');

const contentState = ContentState.createFromBlockArray(contentBlocks);

const rawContentState = convertToRaw(contentState);

const mentionConfig = {
  separator: ' ',
  trigger: '@',
  suggestions: [
    { value: 'abc', display: 'A B C', url: 'abc' },
    { value: 'abcd', display: 'A B C', url: 'abcd' },
    { value: 'abcde', display: 'A B C D', url: 'abcde' },
    { value: 'abcde', display: 'A B C D', url: 'abcde' },
    { value: 'abcde', display: 'A B C D', url: 'abcde' },
    { value: 'abcde', display: 'A B C D E', url: 'abcde' },
    { value: 'abcde', display: 'A B C D E', url: 'abcde' },
    { value: 'abcde', display: 'A B C D E', url: 'abcde' },
    { value: 'abcde', display: 'A B C D E', url: 'abcde' },
    { value: 'abcde', display: 'A B C D E', url: 'abcde' },
    { value: 'abcde', display: 'A B C D E', url: 'abcde' },
    { value: 'abcde', display: 'A B C D E', url: 'abcde' },
    { value: 'abcde', display: 'A B C D E', url: 'abcde' },
  ],
};

class Playground extends Component {

  state: any = {
    editorContent: undefined,
    contentState: undefined,
  };

  onEditorChange: Function = (editorContent) => {
    this.setState({
      editorContent,
    });
  };

  setContentState: Function = () => {
    this.setState({
      contentState: rawContentState,
    });
  };

  imageUploadCallBack: Function = file => new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
        const data = new FormData(); // eslint-disable-line no-undef
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );

  render() {
    const { editorContent, contentState } = this.state;
    return (
      <div className="playground-root">
        <div className="playground-label">
          Toolbar is alwasy <sup>visible</sup>
        </div>
        <button onClick={this.setContentState}>Force Editor State</button>
        <div className="playground-editorSection">
          <div className="playground-editorWrapper">
            <Editor
              contentState={contentState}
              toolbarClassName="playground-toolbar"
              wrapperClassName="playground-wrapper"
              editorClassName="playground-editor"
              onChange={this.onEditorChange}
              uploadCallback={this.imageUploadCallBack}
              spellCheck
              mention={mentionConfig}
            />
          </div>
          <textarea
            className="playground-content no-focus"
            value={draftToHtml(editorContent, mentionConfig)}
          />
          <textarea
            className="playground-content no-focus"
            value={draftToMarkdown(editorContent)}
          />
          <textarea
            className="playground-content no-focus"
            value={JSON.stringify(editorContent)}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Playground />, document.getElementById('app')); // eslint-disable-line no-undef


/**
const rawContentState = ;


toolbar={{
  inline: {
    inDropdown: true,
  },
  list: {
    inDropdown: true,
  },
  textAlign: {
    inDropdown: true,
  },
  link: {
    inDropdown: true,
  },
  image: {
    uploadCallback: this.imageUploadCallBack,
  },
  history: {
    inDropdown: true,
  },
}}*/
