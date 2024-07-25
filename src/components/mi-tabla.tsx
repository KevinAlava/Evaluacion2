import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'mi-tabla',
  styleUrl: 'mi-tabla.css',
  shadow: true,
})
export class MiTabla {
  @Prop() apiUrl: string;
  @State() data: any[] = [];
  @State() error: string = '';

  async componentWillLoad() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.data = await response.json();
    } catch (error) {
      this.error = error.message;
    }
  }

  render() {
    if (this.error) {
      return <div>Error: {this.error}</div>;
    }

    if (this.data.length === 0) {
      return <div>No data available</div>;
    }

    const columns = Object.keys(this.data[0]);

    return (
      <table>
        <thead>
          <tr>
            {columns.map(column => (
              <th>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.data.map(row => (
            <tr>
              {columns.map(column => (
                <td>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
