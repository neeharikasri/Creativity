async function fetchData() {

  const response = await fetch("https://679e543e946b0e23c063279c.mockapi.io/v1/comments");


  const data = await response.json();
  console.log("Fetched Data:", data);
  let comments=``;
  const commentsdiv=document.getElementById(`user-comments`);
  data.forEach(item => {
    let element=`<div class="comment">
        <strong>${item.name}:</strong> ${item.description}
      </div>`
    comments=comments+element;
    //console.log(`ID: ${item.id}, Name: ${item.name}, Description: ${item.description}`);
  });
  commentsdiv.innerHTML=comments;

}
const postData = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Success:', result);
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
};
fetchData();
document.getElementById("comment-form").addEventListener("submit", function(event) {
    
  event.preventDefault();
    let buttonid = document.getElementById("submit-id");
    let name = document.getElementById("name").value.trim();
    let description= document.getElementById("comment").value.trim();
    postData('https://679e543e946b0e23c063279c.mockapi.io/v1/comments', {
      name:name,
      description:description
  });
  buttonid.classList.toggle("dnone")
  setTimeout(() => {
    window.location.reload();
}, 1000);

    
})
  
  