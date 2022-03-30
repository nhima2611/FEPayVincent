const getColorAndNameStatusUser = (status: number) => {
    let color = '';
    let name = '';
    switch (status) {
        case 0:
            color = '#FF0015';
            name = 'Deactive';
            break;
        case 1:
            color = '#27AE60';
            name = 'Active';
            break;
        default:
            color = '#FF0015';
            name = 'N/A';
            break;
    }
    return { color, name };
};

export { getColorAndNameStatusUser };
