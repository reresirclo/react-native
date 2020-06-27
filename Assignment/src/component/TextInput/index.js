import React from 'react';
import { TextInput } from 'react-native';

const CustomTextInput = React.forwardRef((props, ref) => {
    return (
        <TextInput
            {...props}
            ref={ref}
            style={[
                {
                    borderBottomWidth: 1,
                    borderBottomColor: 'red',
                    marginBottom: 15,
                    paddingBottom: 5,
                    paddingBottom: 5,
                    paddingStart: 0,
                    paddingEnd: 0,
                },
                props.style,
            ]}
        />
    );
});

export default CustomTextInput;
