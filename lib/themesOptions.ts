import {DocumentNode, gql} from "@apollo/client";
import {client} from "../config/apollo";

// Themes Options Content
export async function getThemesOptionsContent() {
	try {
		const content: DocumentNode = gql`
			{
				themeOptions(where: {id: 41, status: PUBLISH}) {
					edges {
						node {
							themeOptions {
								address
								email
								emailTwo
								phoneNumber
								phoneNumberTwo
								copyrightText
								facebookLink
								linkedinLink
								twitterLink
								businessHours {
									content
								}
							}
						}
					}
				}
			}
		`;

		const response: any = await client.query({
			query: content,
		});

		return {
			themesOptions:
				response?.data?.themesOptions?.edges[0]?.node?.themeOptions,
		};
	} catch (error) {
		console.log(error);
		throw new Error(
			"Something went wrong trying to fetch themes options content"
		);
	}
}
