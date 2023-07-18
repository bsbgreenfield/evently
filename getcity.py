def split_text_file(file_path):
    cities = []
    with open(file_path, 'r') as file:
        for line in file:
            data = line.strip().split(',')
            if len(data) >= 2:
                cities.append(data[1])
    return cities

# Example usage
file_path = 'cities.txt'  # Replace with the path to your text file
city_list = split_text_file(file_path)
print(city_list)