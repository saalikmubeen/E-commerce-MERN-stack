import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';


const SearchBox = () => {
    const [keyword, setKeyword] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(keyword)
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push("/");
        }

    }
    return (
        <Form onSubmit={handleSubmit} inline>
        <Form.Control
        type='text'
        value={keyword}        
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
    )
}

export default SearchBox;
