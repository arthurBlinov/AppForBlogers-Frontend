import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import {fetchCategoriesAction} from '../../redux/slices/categories/categoriesSlices';

const CategoryDropdown = (props) => {
    //dispatch action
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategoriesAction());
    }, [dispatch]);
    //select categories
    const category = useSelector(state => state?.category);
    const {categoryList, loading,} = category;
    const allCategories= categoryList?.map(category => {
       return { label: category?.title,
                value: category?._id
       }
    });

    //handleChange
    const handleChange = (value) => {
        props.onChange('category', value);
    }
    //handleBlur
    const handleBlur = () => {
        props.onBlur('category', true);
    }
    return (
    <div  style={{margin: '1rem 0'}}> 
        {loading ? <h3 className='text-base text-green-600' >
            Categories list is loading, wait</h3> : (
            <Select 
            onChange={handleChange} 
            onBlur={handleBlur} 
            id='category' 
            options={allCategories}
            value={props?.value?.label} 
            />)}
            {/* Display error */}
            {props?.error?.touched && <div style={{color:'red', marginTop:'5rem'}}>{props?.error}</div>}
    </div>
  )
}

export default CategoryDropdown