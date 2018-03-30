library(dplyr)
library(magrittr)
library(ggplot2)
main <- read.csv("/Users/EriFurusawa/Documents/DataViz/listings.csv")
# old <- read.csv("/Volumes/ESB/Leah/Case\ Study\ Cities/San\ Diego/OLD/CA_OD_main_coded_old.csv")
options("scipen" = 15)

mai <- select(main, host_name, host_since, host_listings_count, host_total_listings_count,
              neighbourhood_group_cleansed, state, accommodates, bedrooms, beds, room_type, price,
              review_scores_rating)

mai <- filter(mai, mai$host_listings_count != 0)
ny <- filter(mai, mai$state == "NY") ## those in nyc
oneapt_all <- filter(ny1, ny1$host_total_listings_count == 1)

one_ny <- length(oneapt_all[,1])
all_ny <- length(ny1[,1])
one_ny / all_ny = 0.823

# code 1 in listings if there are more than 4 total listings
for (i in 1:length(ny$host_name)){
  if (ny$host_total_listings_count[i] == 1){
    ny$listings[i] <- "One listing"
  } else if (ny$host_total_listings_count [i] < 4){
    ny$listings [i] <- "3 or less"
  } else {
    ny$listings[i] <- "4 or more"
  }
}

# change factor levels
ny$listings <- factor(ny$listings, levels = c("One listing", "3 or less", "4 or more"))

# make new data frame for unique hosts
ny1 <- data.frame()
ny1 <- ny[row.names(unique(ny[, c("host_name", "host_since")])),]


#just listing number categories
ggplot(data = ny1, aes(ny1$listings)) + geom_bar(fill = "#f4426b", width = 0.4) +
  labs(x = "Number of listings per host", y = "Number of hosts" ) + theme_bw()
  

# listing categories and room types
ggplot(data = ny1, aes(ny1$listings, fill = ny1$room_type)) + geom_bar(width = 0.4) + 
  labs(x = "Number of listings per host", y = "Number of hosts", fill = "Room type") +
  scale_fill_manual(values = c("#f4426b", "#41f4af", "#f4f141")) + theme_bw()


fourormore <- filter(ny1, ny1$listings == "4 or more")
fourapt <- filter(fourormore, fourormore$room_type == "Entire home/apt")

giant <- as.data.frame(table(fourapt$host_listings_count))
ggplot(data = giant, aes(giant$Var1, giant$Freq)) + geom_point(color = "#f4426b") +
  labs(x = "Number of listings per host", y = "Number of hosts") + theme_bw()

giant_num <- giant
giant_num$Var1 <- as.numeric(as.character(giant_num$Var1))
ggplot(data = giant_num, aes(giant_num$Var1, giant_num$Freq)) + geom_point(color = "#f4426b") +
  labs(x = "Number of listings per host", y = "Number of hosts")+ theme_bw()
