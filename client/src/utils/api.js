export const apiGet = async url => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return { status: 'success', data: json }
    } catch (error) {
        console.log('apiGet error:', {url, error});
        throw { status: 'error', error }
    }
}

export const apiPost = async (url, body = {}, options = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            options
        });
        const json = await response.json();
        if (!response.ok) throw json
        return { status: 'success', data: json }
    } catch (error) {
        console.log('apiPost error:', {url, error});
        throw { status: 'error', error }
    }
}

export const apiPut = async (url, body = {}, options = {}) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            options
        });
        const json = await response.json();
        return { status: 'success', data: json }
    } catch (error) {
        console.log('apiPut error:', {url, error});
        throw { status: 'error', error }
    }
}

export const apiDelete = async url => {
    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });
        const json = await response.json();
        return { status: 'success', data: json }
    } catch (error) {
        console.log('apiDelete error:', {url, error});
        throw { status: 'error', error }
    }
}