import React from 'react';
import { Button } from 'react-bootstrap';
import { Prev } from 'react-bootstrap/esm/PageItem';
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import 'moment/locale/ru';
moment.locale('ru');



class TodoModernize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      f: 'a',
      b: '',
    };
  }
  changeInp = (event) => {
    this.setState({
      b: event
    })
  }
  trouble = () => {
    let pr = this.state.b;
    const text = this.state.text;
    toast.success('Успешно добавлено')
    text.push({
      text: pr,
      show: false,
      data: moment().format('DD.MM.YYYY HH-mm-ss')
    });
    this.setState({
      text: text,
      b: '',
    });
  }
  delete = () => {
    const conf = window.confirm('Are u sure man??')
    if (conf === true) {
    toast.info('Очищено')

      this.setState({
        text: [],
      });
    }
  }

  clear = (param) => {
    const ind = this.state.text
    ind.splice(param, 1)
    toast.error('Успешно удалено')
    this.setState({
      text: ind
    });
  }

  disable = (g) => {

    const done = this.state.text.map((value, index) => {
      if (g === index) {
        return {
          text: value.text,
          show: value.show ? false : true,
          data: value.data
        }
      } else {
        return value;
      }
    });
    this.setState({
      text: done
    });


  }
  componentDidUpdate = (pp, props) => {
    if (pp.text !== this.state.text) {
      localStorage.setItem('list', JSON.stringify(this.state.text))
    }
  }
  componentDidMount = () => {
    this.setState({
      text: JSON.parse(localStorage.getItem('list')) || [],
    })
  }
  render() {
    let color = [
      'green',
      'red',
      'blue'
    ];
    return (

      <div className='div'>
        <h1>
          TO DO LIST ({this.state.text.length})
        </h1>
        <h3>
          Done : {this.state.text.filter((v) => {
            return v.show
          }).length}
          Not done : {this.state.text.filter((v) => {
            return !v.show
          }).length}
        </h3>

        Show : <select value={this.state.f} onChange={(e) => {
          this.setState({
            f: e.target.value
          });
        }}>
          All
          <option value={'a'}>
            All
          </option>
          <option value={'d'}>
            Done
          </option>
          <option value={'nd'}>
            Not done
          </option>
        </select>
        <div>
          <Button disabled={this.state.b === '' ? 'disabled' : ''} className={'m-4'} variant='success' onClick={() => this.trouble()}>
            +
          </Button>
          <input onChange={(event) => this.changeInp(event.target.value)} value={this.state.b} />
          <Button variant='danger' onClick={() => this.delete()} className={'btr m-4'}>
            DEL
          </Button>

          <ul>
            {this.state.text.filter((h) => {
              if (this.state.f === 'a') {
                return true
              } else if (this.state.f === 'd') {
                return h.show
              } else if (this.state.f === 'nd') {
                return !h.show
              }
            }).map((v, index) => {
              return (
                <>
                  <li className={'mr-2'} key={index} style={{ color: color[index % color.length] }}>
                    {v.text}
                  </li>

                  <Button variant='success' size='lg' className={''} onClick={() => this.disable(index)} disabled={v.show ? true : false} className='bot'>Ok</Button>
                  <Button variant='primary' className={'m-2'} onClick={() => this.clear()} disabled={v.show ? false : true} >&times;</Button>
                  <p> {moment(v.data, 'DD.MM.YYYY HH-mm-ss').fromNow()} </p>
                </>
              )
            })}
          </ul>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default TodoModernize;