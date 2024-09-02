const sendSMS = async (apikey, numbers, sender, message) => {
    const url = 'https://api.txtlocal.com/send/?';
    const data = new URLSearchParams({
        apikey: apikey,
        numbers: numbers,
        message: message,
        sender: sender
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
        const result = await response.text();
        return result;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

//MzY0NjMzNGU1MDY4NzY1MjVhNzA1MTc4MzE0YzdhNTc
// NmU0ZDMxNGE0YTY5NTg1NjRlMzgzOTRmNTQ0MzZhNjY=

sendSMS('NmU0ZDMxNGE0YTY5NTg1NjRlMzgzOTRmNTQ0MzZhNjY=', '7038309471', 'Chandan bhagat', 'This is your message')
    .then(resp => console.log(resp))
    .catch(err => console.error(err));
