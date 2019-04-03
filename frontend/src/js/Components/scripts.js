export function GetAllQuestionRequest(url) {
  return fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("access_token"),
    }
  })
  .then((response) => {
    if(response.ok) {
        return response.json();
    } else {
        throw new Error('Server response wasn\'t OK');
    }
  })
  .then((json) => {
    return json;
  });
}

export function GetClassStudents(url) {
  return fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("access_token"),
    }
  })
  .then((response) => {
    if(response.ok) {
        return response.json();
    } else {
        throw new Error('Server response wasn\'t OK');
    }
  })
  .then((json) => {
    return json;
  });
}

export function PostQuestionRequest(name, plural_name, type, cost, unit, guest, level, url, question_number) {
  const body = {
      itemName: name,
      itemPluralName: plural_name,
      itemType: type,
      itemCost: cost,
      itemUnit: unit,
      numberOfGuests: guest,
      level: level,
      question_num: question_number
  };
  return fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("access_token"),
      }
    })
  .then((response) => {
    console.log(response);
    if(response.ok) {
        return response.json();
    } else {
        throw new Error('Server response wasn\'t OK');
    }
  })
  .then((json) => {
    return json;
  });
}

export function PutCheckAnswerRequest(answer, question, url) {
  const body = {
      answer: answer,
      question: question
  };
  return fetch(url, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("access_token"),
      }
    })
  .then((response) => {
    console.log(response);
    if(response.ok) {
        return response.json();
    } else {
        throw new Error('Server response wasn\'t OK');
    }
  })
  .then((json) => {
    return json;
  });
}
