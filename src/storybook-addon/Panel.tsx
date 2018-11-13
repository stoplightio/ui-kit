import * as React from 'react';

export class Panel extends React.Component<any, any> {
  public state = {
    themeName: sessionStorage.themeName || 'light',
  };

  public setTheme = (themeName: string) => {
    this.setState({ themeName });
    sessionStorage.themeName = themeName;
  };

  public componentDidMount() {
    const { channel } = this.props;
    // Listen to the theme and change it.
    channel.on('themes/setTheme', this.setTheme);
  }

  public render() {
    const { themeName } = this.state;
    const { active, channel, themes } = this.props;

    return active ? (
      <div
        style={{
          margin: 25,
          width: '100%',
          overflow: 'auto',
        }}
      >
        {Object.keys(themes).map(x => (
          <div
            key={x}
            onClick={() => channel.emit('themes/setTheme', x)}
            style={{
              display: 'inline-block',
              padding: '5px 10px',
              color: x === themeName ? 'green' : undefined,
              border: `1px solid ${x === themeName ? '#ccc' : '#ddd'}`,
              marginRight: 10,
              cursor: x === themeName ? 'default' : 'pointer',
              background: x === themeName ? '#eee' : 'transparent',
              fontWeight: 'bold',
              borderRadius: 3,
            }}
          >
            {x}
          </div>
        ))}
      </div>
    ) : null;
  }

  // This is some cleanup tasks when the Notes panel is unmounting.
  public componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener('setTheme', this.setTheme);
  }
}
