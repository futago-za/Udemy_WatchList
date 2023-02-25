chrome.runtime.onMessage.addListener((message, sender, callback) => {
  if (!message) {
    callback(false);
  } else {
    const hostname = message.hostname;
    const port = message.port;
    fetch(`http://${hostname}:${port}/csrfprotect/`, {'method': 'GET'})
      .then((response) => {
        if (!response.ok) {
          throw Error('failed fetch csrf token');
        }
        return response.json();
      }).then((data) => {
        csrf_token = data['token'];
        fetch(`http://${hostname}:${port}/api/course/`, {
          'method': 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': data['token']
          },
          body: JSON.stringify(message.payload)
        }).then((response) => {
          if(response.ok) {
            callback(true);
          } else {
            throw Error('failed post course data');
          }
        }).catch((err) => {
          callback(false);
        });
      }).catch((err) => {
        callback(false);
      });
  }

  return true;
});
