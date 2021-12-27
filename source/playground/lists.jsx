'use strict';


function ListTemp(props) {
    const l = [1,2,3,4,5];
    return (
        <ul>
            {l.map(function(item) {
                return <li key={item}>{item}</li>
            })}
        </ul>
    );
}


  
ReactDOM.render(
    <ListTemp />,
    document.getElementById('lists')
  );